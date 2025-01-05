import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PasswordModule } from './password/password.module';
import { RolesMetadataModule } from './roles-metadata/roles-metadata.module';
import { CompanyModule } from './company/company.module';
import { ServicesMetadataModule } from './services-metadata/services-metadata.module';
import { IntervalsMetadataModule } from './intervals-metadata/intervals-metadata.module';
import { NotificationMethodsMetadataModule } from './notification-methods-metadata/notification-methods-metadata.module';
import { SnoozeMetadataModule } from './snooze-metadata/snooze-metadata.module';
import { UserServiceModule } from './user-service/user-service.module';
import { UserServiceHistoryModule } from './user-service-history/user-service-history.module';
import { RequestCallHistoryModule } from './request-call-history/request-call-history.module';
import { RequestCallErrorHistoryModule } from './request-call-error-history/request-call-error-history.module';
import { NotificationHistoryModule } from './notification-history/notification-history.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    PasswordModule,
    RolesMetadataModule,
    CompanyModule,
    ServicesMetadataModule,
    IntervalsMetadataModule,
    NotificationMethodsMetadataModule,
    SnoozeMetadataModule,
    UserServiceModule,
    UserServiceHistoryModule,
    RequestCallHistoryModule,
    RequestCallErrorHistoryModule,
    NotificationHistoryModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
