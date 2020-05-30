import {Module} from '@nestjs/common';
import {HealthModule} from './health/health.module';
import {WatcherModule} from "./watcher/watcher.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        HealthModule,
        WatcherModule,
        AuthModule,
    ],
})

export class AppModule {
}
