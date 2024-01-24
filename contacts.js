const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// MEMBUAT FOLDER DATA
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// MEMBUAT FILE JSON JIKA BELUM ADA
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[ ]', 'utf-8');
};

const loadContact = () => {
    const bacaSync = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(bacaSync);
    return contacts;
}

// SIMPAN KONTAK
const simpanContact = (nama, umur, email, noHP, alamat) => {
    const contact = {nama, umur, email, noHP, alamat};
    // const bacaSync = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(bacaSync);
    const contacts = loadContact();

// CEK DUPLIKAT
const dupliakat = contacts.find((contact) => contact.nama === nama);
if (dupliakat) {
    console.log(chalk.red('Contact sudah terdaftar, gunakan nama lain'));
    return false;
}

// CEK EMAIL = TRUE
if(email) {
    if(!validator.isEmail(email)) {
        console.log(chalk.red('Email tidak valid!'));
        return false;
    }
}

// CEK NOMOR HP = TRUE
if(noHP) {
    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red('Nomor HP tidak valid!'));
        return false;
    }
}

    contacts.push(contact);
     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green('Terimakasih telah memasukan data!'));
};

const lisContact = () => {
    const contacts = loadContact();
    console.log(chalk.green('DAFTAR KONTAK'));
    contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);  
    })
};


// MENAMPILKAN DETAIL KONTAK BERDASARKAN NAMA
const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if (!contact) {
        console.log(chalk.red(`${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.green.bold(contact.nama));
    console.log(chalk.green(contact.noHP));
    if (contact.email) {
        console.log(chalk.green(contact.email));
        
    }
    
};

// MENGHAPUS KONTAK BERDASARKAN NAMA
const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter (
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase() 
);

if (!contacts.length === newContacts.length) {
    console.log(chalk.red(`${nama} tidak ditemukan!`));
    return false;
}
fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
console.log(chalk.green(`${nama} berhasil dihapus!`));
}
module.exports = {simpanContact, lisContact, detailContact, deleteContact};