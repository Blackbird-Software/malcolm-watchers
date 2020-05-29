import {Controller, Get} from '@nestjs/common';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator
} from '@nestjs/terminus';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('health')
@Controller('health_check')
export class HealthController {
    constructor(
        private healthCheckService: HealthCheckService,
        private diskHealthIndicator: DiskHealthIndicator,
        private memoryHealthIndicator: MemoryHealthIndicator,
    ) {
    }

    @Get()
    @HealthCheck()
    readiness() {
        return this.healthCheckService.check([
            () => this.diskHealthIndicator.checkStorage('storage', {thresholdPercent: 0.7, path: '/'}),
            () => this.memoryHealthIndicator.checkHeap('memory_rss', 250 * 1024 * 1024),
        ]);
    }
}
