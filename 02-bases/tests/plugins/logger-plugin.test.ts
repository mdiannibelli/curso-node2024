import { buildLogger } from "../../src/plugins";
import { logger } from "../../src/plugins/logger.plugin";

describe('plugins/logger.plugin', () => {
    test('buildLogger should return a function logger', () => {
        const logger = buildLogger('test');

        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');
    });

    test('logger.log should log a message', () => {
        const winstonLoggerMock = jest.spyOn(logger, 'log');

        const message = 'test message';
        const service = 'test service';

        const newLogger = buildLogger(service);
        newLogger.log(message);

        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                level: 'info',
                message,
                service
            })
        );
    })
})