export default class FilePathWrapper {
    readonly filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath
    }

    getFileName(): string {
        return this.filePath.replace(/^.*[\\\/]/, "")
    }

}