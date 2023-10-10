import fs from "fs";

interface IEmailTypeBuilder<AdditionalDataForHtmlVar, DefaultDataForHtmlVars = {}> {

    template: string;
    vars: {
        subjectEmail: string;
        additionalDataForHtmlVars: AdditionalDataForHtmlVar;
        defaultDataForHtmlVar?: DefaultDataForHtmlVars;
    };
    destinationType: "admin" | "client";
}

export class EmailTypeBuilder<AdditionalDataForHtmlVar, DefaultDataForHtmlVar = {}> {
    constructor(
        private templatePath: string,
        private subjectEmail: string,
        private destinationType: "admin" | "client",
        private defaultDataForHtmlVar: DefaultDataForHtmlVar = {} as DefaultDataForHtmlVar,
        private additionalDataForHtmlVars: AdditionalDataForHtmlVar = {} as AdditionalDataForHtmlVar
    ) {}

    build(): IEmailTypeBuilder<AdditionalDataForHtmlVar, DefaultDataForHtmlVar> {
        return {
            template: fs.readFileSync(this.templatePath, "utf-8"),
            vars: {
                subjectEmail: this.subjectEmail,
                additionalDataForHtmlVars: this.additionalDataForHtmlVars,
                defaultDataForHtmlVar: this.defaultDataForHtmlVar,
            },
            destinationType: this.destinationType,
        };
    }
}