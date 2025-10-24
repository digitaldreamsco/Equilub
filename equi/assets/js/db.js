/**
 * Base de datos manual simple en memoria
 */
class Database {
  constructor() {
    // Almacenamiento en memoria
    this.tables = {};
    this.connected = false;
  }

  // Conectar a la "base de datos"
  connect() {
    this.connected = true;
    console.log("✅ Conectado a la base de datos en memoria");
    return this.connected;
  }

  // Desconectar
  disconnect() {
    this.connected = false;
    console.log("❌ Desconectado de la base de datos");
    return true;
  }

  // Crear una tabla
  createTable(tableName) {
    if (!this.connected) {
      console.error("Error: No hay conexión a la base de datos");
      return false;
    }
    
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
      console.log(`Tabla ${tableName} creada correctamente`);
      return true;
    }
    
    console.log(`La tabla ${tableName} ya existe`);
    return false;
  }

  // Insertar datos
  insert(tableName, data) {
    if (!this.connected) {
      console.error("Error: No hay conexión a la base de datos");
      return null;
    }
    
    if (!this.tables[tableName]) {
      this.createTable(tableName);
    }
    
    // Generar un ID único si no se proporciona
    const id = data.id || Date.now() + Math.floor(Math.random() * 1000);
    const newRecord = { ...data, id };
    
    this.tables[tableName].push(newRecord);
    console.log(`Registro insertado en ${tableName} con ID: ${id}`);
    return newRecord;
  }

  // Método para importar datos desde Excel a la base de datos
  importFromExcel(file, tableName, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject(new Error("No hay conexión a la base de datos"));
        return;
      }

      // Verificamos que exista la biblioteca XLSX
      if (typeof XLSX === 'undefined') {
        reject(new Error("La biblioteca XLSX no está disponible. Incluya 'xlsx.full.min.js' en su HTML"));
        return;
      }

      // Crear la tabla si no existe
      if (!this.tables[tableName]) {
        this.createTable(tableName);
      }

      // Configuración por defecto
      const config = {
        sheet: 0, // Primera hoja por defecto
        headerRow: true, // Asumir que la primera fila contiene encabezados
        ...options
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, {type: 'array'});
          
          // Obtener el nombre de la hoja (primera hoja por defecto)
          const sheetName = typeof config.sheet === 'number' 
            ? workbook.SheetNames[config.sheet] 
            : config.sheet;
          
          if (!sheetName) {
            reject(new Error("No se encontró la hoja especificada"));
            return;
          }
          
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {defval: ""});
          
          console.log(`Procesando ${jsonData.length} registros de Excel para importar a tabla ${tableName}`);
          
          // Importar todos los registros
          const importedRecords = [];
          jsonData.forEach(record => {
            const importedRecord = this.insert(tableName, record);
            if (importedRecord) {
              importedRecords.push(importedRecord);
            }
          });
          
          console.log(`✅ Se importaron ${importedRecords.length} registros a la tabla ${tableName}`);
          resolve({
            totalRecords: jsonData.length,
            importedRecords: importedRecords.length,
            table: tableName,
            data: importedRecords
          });
        } catch (error) {
          console.error("Error al procesar el Excel:", error);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error("Error al leer el archivo:", error);
        reject(error);
      };
      
      reader.readAsArrayBuffer(file);
    });
  }

  // Método para vaciar una tabla específica
  clearTable(tableName) {
    if (!this.connected) {
      console.error("Error: No hay conexión a la base de datos");
      return false;
    }
    
    if (!this.tables[tableName]) {
      console.warn(`La tabla ${tableName} no existe`);
      return false;
    }
    
    this.tables[tableName] = [];
    console.log(`Tabla ${tableName} vaciada correctamente`);
    return true;
  }

  // Obtener todos los registros de una tabla
  getAll(tableName) {
    if (!this.connected) {
      console.error("Error: No hay conexión a la base de datos");
      return [];
    }
    
    if (!this.tables[tableName]) {
      console.warn(`La tabla ${tableName} no existe`);
      return [];
    }
    
    return [...this.tables[tableName]];
  }

  // Obtener un registro por ID
  getById(tableName, id) {
    if (!this.connected || !this.tables[tableName]) {
      return null;
    }
    
    return this.tables[tableName].find(record => record.id === id) || null;
  }

  // Actualizar un registro
  update(tableName, id, newData) {
    if (!this.connected || !this.tables[tableName]) {
      return false;
    }
    
    const index = this.tables[tableName].findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.tables[tableName][index] = { ...this.tables[tableName][index], ...newData };
    console.log(`Registro con ID ${id} actualizado en tabla ${tableName}`);
    return true;
  }

  // Eliminar un registro
  delete(tableName, id) {
    if (!this.connected || !this.tables[tableName]) {
      return false;
    }
    
    const initialLength = this.tables[tableName].length;
    this.tables[tableName] = this.tables[tableName].filter(item => item.id !== id);
    
    const deleted = this.tables[tableName].length < initialLength;
    if (deleted) {
      console.log(`Registro con ID ${id} eliminado de tabla ${tableName}`);
    }
    
    return deleted;
  }

  // Guardar en localStorage (persistencia básica)
  save() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('equiDatabase', JSON.stringify(this.tables));
      console.log("Base de datos guardada en localStorage");
      return true;
    }
    return false;
  }

  // Cargar desde localStorage
  load() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('equiDatabase');
      if (data) {
        try {
          this.tables = JSON.parse(data);
          console.log("Base de datos cargada desde localStorage");
          return true;
        } catch (e) {
          console.error("Error al cargar la base de datos:", e);
        }
      }
    }
    return false;
  }
}

// Crear y exportar una instancia
const db = new Database();

// Ejemplo de uso:
/*
db.connect();
db.createTable('equipos');
db.insert('equipos', { nombre: 'Equipo 1', estado: 'Activo' });
console.log(db.getAll('equipos'));
*/

// Exportar la instancia
module.exports = db;
