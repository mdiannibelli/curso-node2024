import { emailTemplate } from "../../src/js-foundations/01-template";

describe("js-foundations/01.template.js", () => {
    test('emailTemplate should contain a greeting', () => {
        expect(emailTemplate).toContain('Hi,'); 
    })


    test('emailTemplete should contain {{name}} and {{orderId}}', () => {
        expect(emailTemplate).toContain('{{name}}');
        expect(emailTemplate).toContain('{{orderId}}');
    })
})