"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const node_path_1 = require("node:path");
const express_1 = __importDefault(require("express"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const envOrigins = process.env.CORS_ORIGINS?.split(',')
        .map((origin) => origin.trim())
        .filter(Boolean) ?? [];
    const localhostPattern = /^http:\/\/localhost:\d+$/;
    const localhostIpPattern = /^http:\/\/127\.0\.0\.1:\d+$/;
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                callback(null, true);
                return;
            }
            const isEnvAllowed = envOrigins.includes(origin);
            const isLocalAllowed = localhostPattern.test(origin) || localhostIpPattern.test(origin);
            if (isEnvAllowed || isLocalAllowed) {
                callback(null, true);
                return;
            }
            callback(new Error('CORS blocked'), false);
        },
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
        credentials: true,
        optionsSuccessStatus: 204,
    });
    app.setGlobalPrefix('api');
    app.use('/uploads', express_1.default.static((0, node_path_1.join)(process.cwd(), 'uploads')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map