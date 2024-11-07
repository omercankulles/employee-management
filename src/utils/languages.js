// Language Definitions
export const LANGUAGES = {
    tr: {
        // Genel
        appTitle: 'Çalışan Yönetim Sistemi',
        loading: 'Yükleniyor...',
        error: 'Hata',
        save: 'Kaydet',
        cancel: 'İptal',
        edit: 'Düzenle',
        delete: 'Sil',
        search: 'Ara',
        actions :'İşlemler',
        create: 'Oluştur',

        // Başlıklar
        employees:'Çalışanlar',
        employeeList: 'Çalışan Listesi',
        addNewEmployee: 'Yeni Çalışan Ekle',
        editEmployee: 'Çalışanı Düzenle',

        // Form Alanları
        firstName: 'Ad',
        lastName: 'Soyad',
        dateOfEmployment: 'İşe Başlama Tarihi',
        dateOfBirth: 'Doğum Tarihi',
        phone: 'Telefon Numarası',
        email: 'E-posta Adresi',
        department: 'Departman',
        position: 'Pozisyon',

        // Departmanlar
        analytics: 'Analitik',
        tech: 'Teknoloji',

        // Pozisyonlar
        junior: 'Junior',
        medior: 'Medior',
        senior: 'Senior',

        // Butonlar
        addNew: 'Yeni Ekle',
        listView: 'Liste Görünümü',
        gridView: 'Kart Görünümü',

        // Onay Mesajları
        confirmDelete: 'Bu çalışanı silmek istediğinizden emin misiniz?',
        confirmUpdate: 'Değişiklikleri kaydetmek istediğinizden emin misiniz?',
        areYouSure: 'Emin misiniz?',
        deleteConfirmationMessage: '{firstName} {lastName} isimli çalışan kaydı silinecek',
        proceed: 'Devam Et',

        // Başarı Mesajları
        employeeAdded: 'Çalışan başarıyla eklendi',
        employeeUpdated: 'Çalışan bilgileri güncellendi',
        employeeDeleted: 'Çalışan silindi',

        // Hata Mesajları
        required: 'Bu alan zorunludur',
        invalidEmail: 'Geçerli bir e-posta adresi giriniz',
        invalidPhone: 'Geçerli bir telefon numarası giriniz',
        emailExists: 'Bu e-posta adresi zaten kullanımda',
        employeeAlreadyExists: 'Bu isim ve soyisimde bir çalışan zaten mevcut!',
        savingError: 'Çalışan kaydedilirken bir hata oluştu',

        // Form Açıklamaları
        enterEmployeeDetails: 'Çalışan bilgilerini giriniz',
        updateEmployeeDetails: 'Çalışan bilgilerini güncelleyiniz',
    },
    en: {
        // General
        appTitle: 'Employee Management System',
        loading: 'Loading...',
        error: 'Error',
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        search: 'Search',
        actions :'Actions',
        create: 'Create',



        // Titles
        employees:'Employees',
        employeeList: 'Employee List',
        addNewEmployee: 'Add New Employee',
        editEmployee: 'Edit Employee',

        // Form Fields
        firstName: 'First Name',
        lastName: 'Last Name',
        dateOfEmployment: 'Date of Employment',
        dateOfBirth: 'Date of Birth',
        phone: 'Phone Number',
        email: 'Email Address',
        department: 'Department',
        position: 'Position',

        // Departments
        analytics: 'Analytics',
        tech: 'Tech',

        // Positions
        junior: 'Junior',
        medior: 'Medior',
        senior: 'Senior',

        // Buttons
        addNew: 'Add New',
        listView: 'List View',
        gridView: 'Grid View',

        // Confirmation Messages
        confirmDelete: 'Are you sure you want to delete this employee?',
        confirmUpdate: 'Are you sure you want to save the changes?',
        areYouSure: 'Are you sure?',
        deleteConfirmationMessage: 'Selected Employee record of {firstName} {lastName} will be deleted',
        proceed: 'Proceed',

        // Success Messages
        employeeAdded: 'Employee added successfully',
        employeeUpdated: 'Employee updated successfully',
        employeeDeleted: 'Employee deleted successfully',

        // Error Messages
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
        invalidPhone: 'Please enter a valid phone number',
        emailExists: 'This email is already in use',
        employeeAlreadyExists: 'An employee with this first name and last name already exists!',
        savingError: 'An error occurred while saving employee',


        // Form Descriptions
        enterEmployeeDetails: 'Enter employee details',
        updateEmployeeDetails: 'Update employee details',
    }
};

const STORAGE_KEY = 'app_language';
const DEFAULT_LANG = 'en';

class LanguageManager {
    constructor() {
        this._listeners = new Set();
        this._initLanguage();
    }

    _initLanguage() {
        const savedLang = localStorage.getItem(STORAGE_KEY);

        const htmlLang = document.documentElement.lang;

        const browserLang = navigator.language.split('-')[0];

        this._currentLang = savedLang || htmlLang || (LANGUAGES[browserLang] ? browserLang : DEFAULT_LANG);

        this._applyLanguage(this._currentLang);
    }

    _applyLanguage(lang) {
        this._currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
    }

    get currentLang() {
        return this._currentLang;
    }

    setLanguage(lang) {
        if (LANGUAGES[lang] && lang !== this._currentLang) {
            this._applyLanguage(lang);
            this._notify();
        }
    }

    translate(key) {
        const translations = LANGUAGES[this._currentLang];
        return translations[key] || key;
    }

    subscribe(listener) {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    _notify() {
        this._listeners.forEach(listener => listener(this._currentLang));
    }

    getAvailableLanguages() {
        return Object.keys(LANGUAGES).map(code => ({
            code,
            name: LANGUAGES[code].languageName || code.toUpperCase()
        }));
    }

    resetLanguage() {
        localStorage.removeItem(STORAGE_KEY);
        this._initLanguage();
        this._notify();
    }
}

// Singleton instance
export const languageManager = new LanguageManager();