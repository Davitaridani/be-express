-- CreateTable
CREATE TABLE `Rtp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `game_name` VARCHAR(150) NOT NULL,
    `img_url` VARCHAR(191) NULL,
    `value` INTEGER NOT NULL,
    `pola` INTEGER NOT NULL,
    `pola_rtp` TEXT NULL,
    `status_game` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `status_vendor` INTEGER NULL,
    `vendor_name` VARCHAR(70) NOT NULL,
    `warna` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
