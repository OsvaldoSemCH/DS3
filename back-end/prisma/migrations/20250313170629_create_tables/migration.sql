-- CreateTable
CREATE TABLE `Player` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Number` INTEGER NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Nickname` VARCHAR(191) NOT NULL,
    `IdTrainer` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pokemon` ADD CONSTRAINT `Pokemon_IdTrainer_fkey` FOREIGN KEY (`IdTrainer`) REFERENCES `Player`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
