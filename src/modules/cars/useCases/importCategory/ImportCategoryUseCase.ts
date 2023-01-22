

class ImportCategoryUseCase {


    execute(file: Express.Multer.File) {
        console.log(file);

        return file
    }
}

export { ImportCategoryUseCase };