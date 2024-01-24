const yargs = require('yargs');
const contacts = require('./contacts');

// PARAMETER OBJECT
yargs.command({
    command:'add', 
    describe : 'menambahkan kontak baru', 
    builder : {
        nama : {
            describe : "Nama lengkap",
            demandOption : true,
            type : 'string',
        },
        umur : {
            describe : 'umur',
            demandOption : true,
            type : 'integer',
        },
        email : {
            describe : 'email',
            denamdOption : false,
            type : 'string'
        },
        noHP : {
            describe : 'nomor HP',
            demandOption : true,
            type : 'string',
        },
        alamat : {
            describe : 'alamat',
            demandOption : false,
            type : 'string',
        },
    },
    handler(argv) {
contacts.simpanContact(argv.nama, argv.umur, argv.email, argv.noHP, argv.alamat)
    },
}).demandCommand();


// MENAMPILKAN DAFTAR NAMA DAN NOMOR HP KONTAK
yargs.command({
    command : 'list',
    describe : 'menampilkan semua nama dan nomor hp contact',
    handler() {
        contacts.lisContact();
    },
})


// MENAMPILKAN DETAIL SEBUAH KONTAK
yargs.command({
    command : 'detail',
    describe : 'menampilkan detail sebuah contact berdasarkan nama',
    builder : {
        nama : {
            describe : "Nama lengkap",
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv) {
        contacts.detailContact(argv.nama);
    }
})


// MENGHAPUS KONTAK BERDASARKAN NAMA
yargs.command({
    command : 'delete',
    describe : 'Menghapus kontak berdasarkan nama',
    builder : {
        nama : {
            describe : "Nama lengkap",
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv) {
        contacts.deleteContact(argv.nama);
    }
})

yargs.parse();



