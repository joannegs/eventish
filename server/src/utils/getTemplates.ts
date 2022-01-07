import { compile } from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';

export const getTemplate = (templateName: string, data?: any) => {
    const filePath = join(__dirname, `../resources/templates/${templateName}.html`);
    const source = readFileSync(filePath, 'utf-8').toString();
    const template = compile(source);

    return (data ? template(data) : template(''));
}
