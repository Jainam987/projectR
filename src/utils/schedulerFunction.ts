// import { PrismaService } from '../prisma/prisma.service';

import { UserServiceService } from 'src/modules/user-service/user-service.service';
import { PrismaService } from '../../src/modules/prisma/prisma.service';
import axios from 'axios';
import { AxiosService } from 'src/modules/axios/axios.service';
import { url } from 'inspector';
import { RequestCallHistoryService } from 'src/modules/request-call-history/request-call-history.service';
import { RequestCallErrorHistoryService } from 'src/modules/request-call-error-history/request-call-error-history.service';


export async function schedulerFunction(userServiceId: string) {
  class schedulerFunctionUtil {
    constructor(
      private readonly userServiceService: UserServiceService,
      private readonly axiosService: AxiosService,
      private readonly requestCallHistoryService: RequestCallHistoryService,
      private readonly requestCallErrorHistoryService: RequestCallErrorHistoryService,
    ) {}

    async schedulerFunction() {
      try {
        // Get user service data from DB
        // call the request as per the service
        // store the respone
        // If response is success then save the response in DB
        // If response is failed do as follow
        // check the active error strore in the error table
        // if yse then chek the snooze
        // if snooze is on then do nothing
        // else get the notification data to send the notification
        // else create error in the DB and send the notificatin by geting notification data

        const userService =
          await this.userServiceService.findOne(userServiceId);

        const reqMethod = userService.req_method;
        const reqUrl = userService.URL;
        const reqBody = userService.req_body;
        const reqHeaders = userService.req_headers;
        const reqBodyEncoding = userService.req_body_encoding;
        const requestTimeout = userService.request_timeout;
        const retries = userService.retries;
        const acceptedStatusCodes = userService.accepted_status_code;
        const serviceCode = userService.service_code;
        const snooze = userService.snooze;

        const requestTime = new Date();
        const responseData = await this.axiosService.axiosMethod({
          url: reqUrl,
          method: reqMethod,
          data: reqBody,
          headers: reqHeaders,
          timeout: requestTimeout,
          responseType: reqBodyEncoding,
        });

        console.log('Response Data: ', responseData);

        // modify requestCallHistory create object for the error
        const requestCallHistory = await this.requestCallHistoryService.create({
          request: reqBody,
          response: responseData,
          service_id: userService.service_id,
          request_time: requestTime,
          response_time: new Date(),
          is_error: false,
          is_resolved: true,
          interval_id: userService.interval_id,
          interval_time: userService.interval_time,
        });

        console.log('Request Call History: ', requestCallHistory);

        if (
          !responseData &&
          userService?.is_error &&
          userService?.next_snooze_time < new Date() &&
          !userService?.is_single_time_alert
        ) {
          let snoozePoint
          let updatedCurrentSnoozePoint
          const nextSnoozePoint = userService?.current_snooze_point + 1;
          if (nextSnoozePoint < snooze.length) {
            snoozePoint = snooze.length - 1
            updatedCurrentSnoozePoint = nextSnoozePoint
          } else {
            snoozePoint = nextSnoozePoint
            updatedCurrentSnoozePoint = nextSnoozePoint
          }

          // update the next_snooze_time userServiceService
          const updatedErrorUserService = await this.userServiceService.update(
            userServiceId,
            {
              next_snooze_time:
                userService?.is_single_time_alert
                  ? null
                  : new Date() + snooze[snoozePoint] * 1000,
              current_snooze_point: updatedCurrentSnoozePoint
            },
          );
          // send notification
        }

        if (responseData && userService?.is_error) {
          const updatedResolveUserService =
            await this.userServiceService.update(userServiceId, {
              is_error: false,
              is_resolved: true,
              previous_snooze_time: null,
              next_snooze_time: null,
              current_snooze_point: 0,
            });
        }

        if (!responseData && !userService?.is_error) {
          const updatedErrorUserService = await this.userServiceService.update(
            userServiceId,
            {
              is_error: true,
              is_resolved: false,
              previous_snooze_time: new Date(),
              next_snooze_time:
                snooze.length && !userService?.is_single_time_alert
                  ? new Date() + snooze[0] * 1000
                  : null,
            },
          );

          // create requestCallErrorHistoryService
          const requestCallErrorHistory = await this.requestCallErrorHistoryService.create({
            error_started_time: new Date(),
            snooze: userService.snooze,
            service_id: userService.service_id,
            request_call_history_id: requestCallHistory.id,
            notification_method_id: userService.notification_method_id,
            notification_history_id: [],
          });

          // send notification
        }
      } catch (error) {
        console.log('Error:> ', error?.status, error?.response?.data);
      }
    }
  }
}
