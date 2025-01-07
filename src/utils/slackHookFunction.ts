import axios from "axios";

export async function slackHookFunction(webhookURL: string, message: string) {
    try {
        const responseData = await axios.post(webhookURL, {
          text: message
        })
        console.log('Response Data:> ',responseData.status,  responseData.data );
      } catch (error) {
        console.log('Error:> ', error?.status, error?.response?.data);
      }
}