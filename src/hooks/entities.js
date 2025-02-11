export class Translation {
    constructor(language_code = "", name = "", description = "", subtitle = "") {
        this.translation_id = null;
        this.language_code = language_code;
        this.name = name;
        this.description = description;
        this.subtitle = subtitle;
    }
}

export class File {
    constructor(file_id = null, url = "", tag = "", device_type = "") {
        this.file_id = file_id;
        this.url = url;
        this.tag = tag;
        this.device_type = device_type;
    }
}

export class Educator {
    constructor() {
        this.user_id = null;
        this.entity_type = "educator";
        this.translations = [new Translation()];
    }

    addTranslation(translation) {
        if (translation instanceof Translation) {
            this.translations.push(translation);
        }
    }
}

export class Course {
    constructor() {
        this.course_id = null;
        this.entity_type = "course";
        this.translations = [new Translation()];
    }

    addTranslation(translation) {
        if (translation instanceof Translation) {
            this.translations.push(translation);
        }
    }
}

export class Academy {
    constructor() {
        this.program_id = null;
        this.is_enabled = null;
        this.entity_type = "program";
        this.translations = [new Translation()];
        this.files = [];
        this.educator = [];
        this.courses = [];
    }

    addCourse(course) {
        if (course instanceof Course) {
            this.courses.push(course);
        }
    }

    addEducator(educator) {
        if (educator instanceof Educator) {
            this.educator.push(educator);
        }
    }

    addFile(file) {
        if (file instanceof File) {
            this.files.push(file);
        }
    }

    addTranslation(translation) {
        if (translation instanceof Translation) {
            this.translations.push(translation);
        }
    }
}

export class Banner {
    constructor() {
        this.id_banner = null;
        this.language_code = "";
        this.name = "";
        this.description = "";
        this.subtitle = "";
        this.enlace = "";
        this.files = [];  // Cambiado a un arreglo para soportar múltiples archivos
    }

    addFile(file) {
        if (file instanceof File) {
            this.files.push(file);
        } else {
            throw new Error("Invalid file object");
        }
    }
}
