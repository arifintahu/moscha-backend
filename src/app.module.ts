import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { configuration } from './config/configuration';
import { SessionMiddleware } from './common/middleware';
import { SessionsModule } from './sessions';
import { ChainsModule } from './chains';
import { ChatsModule, ChatsController } from './chats';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    // Database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('database'),
      }),
      inject: [ConfigService],
    }),

    // Modules
    SessionsModule,
    ChainsModule,
    ChatsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(ChatsController);
  }
}
