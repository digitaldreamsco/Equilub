<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Machine;

class EquipmentHierarchySeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Crear equipos principales
        $excavadora = Machine::create([
            'name' => 'Excavadora CAT 320D',
            'state' => 'Operativa',
            'type' => 'Maquinaria Pesada',
            'description' => 'Excavadora principal para movimiento de tierra',
            'equipment_type' => 'equipment',
            'observation' => 'Equipo en buen estado',
        ]);

        $bulldozer = Machine::create([
            'name' => 'Bulldozer D6T',
            'state' => 'Mantenimiento',
            'type' => 'Maquinaria Pesada',
            'description' => 'Bulldozer para nivelación de terreno',
            'equipment_type' => 'equipment',
            'observation' => 'Requiere mantenimiento preventivo',
        ]);

        // Sub-equipos de la excavadora
        $sistemaHidraulico = Machine::create([
            'name' => 'Sistema Hidráulico',
            'state' => 'Operativo',
            'type' => 'Sistema',
            'description' => 'Sistema hidráulico principal de la excavadora',
            'equipment_type' => 'subequipment',
            'parent_id' => $excavadora->id,
            'observation' => 'Presión normal',
        ]);

        $sistemaMotor = Machine::create([
            'name' => 'Sistema Motor',
            'state' => 'Operativo',
            'type' => 'Sistema',
            'description' => 'Motor diésel principal',
            'equipment_type' => 'subequipment',
            'parent_id' => $excavadora->id,
            'observation' => 'Funcionamiento óptimo',
        ]);

        $sistemaOrugas = Machine::create([
            'name' => 'Sistema de Orugas',
            'state' => 'Operativo',
            'type' => 'Sistema',
            'description' => 'Sistema de tracción por orugas',
            'equipment_type' => 'subequipment',
            'parent_id' => $excavadora->id,
            'observation' => 'Desgaste normal',
        ]);

        // Componentes del sistema hidráulico
        $bombaHidraulica = Machine::create([
            'name' => 'Bomba Hidráulica Principal',
            'state' => 'Operativa',
            'type' => 'Bomba',
            'description' => 'Bomba de pistones axiales',
            'equipment_type' => 'component',
            'parent_id' => $sistemaHidraulico->id,
            'observation' => 'Funcionamiento normal',
        ]);

        $cilindrosElevacion = Machine::create([
            'name' => 'Cilindros de Elevación',
            'state' => 'Operativo',
            'type' => 'Cilindro',
            'description' => 'Cilindros hidráulicos para elevación del brazo',
            'equipment_type' => 'component',
            'parent_id' => $sistemaHidraulico->id,
            'observation' => 'Sin fugas detectadas',
        ]);

        $filtroHidraulico = Machine::create([
            'name' => 'Filtro Hidráulico',
            'state' => 'Operativo',
            'type' => 'Filtro',
            'description' => 'Filtro principal del sistema hidráulico',
            'equipment_type' => 'component',
            'parent_id' => $sistemaHidraulico->id,
            'observation' => 'Pendiente cambio próximo mantenimiento',
        ]);

        // Partes de la bomba hidráulica
        Machine::create([
            'name' => 'Pistones de la Bomba',
            'state' => 'Operativo',
            'type' => 'Pistón',
            'description' => 'Set de pistones de la bomba principal',
            'equipment_type' => 'part',
            'parent_id' => $bombaHidraulica->id,
            'observation' => 'Buen estado',
        ]);

        Machine::create([
            'name' => 'Plato de Levas',
            'state' => 'Operativo',
            'type' => 'Plato',
            'description' => 'Plato de levas de la bomba hidráulica',
            'equipment_type' => 'part',
            'parent_id' => $bombaHidraulica->id,
            'observation' => 'Sin desgaste visible',
        ]);

        Machine::create([
            'name' => 'Sellos de la Bomba',
            'state' => 'Atención',
            'type' => 'Sello',
            'description' => 'Sellos principales de la bomba',
            'equipment_type' => 'part',
            'parent_id' => $bombaHidraulica->id,
            'observation' => 'Revisar en próximo mantenimiento',
        ]);

        // Componentes del sistema motor
        $filtroAceite = Machine::create([
            'name' => 'Filtro de Aceite',
            'state' => 'Operativo',
            'type' => 'Filtro',
            'description' => 'Filtro de aceite del motor',
            'equipment_type' => 'component',
            'parent_id' => $sistemaMotor->id,
            'observation' => 'Cambiado recientemente',
        ]);

        $turbocompresor = Machine::create([
            'name' => 'Turbocompresor',
            'state' => 'Operativo',
            'type' => 'Compresor',
            'description' => 'Turbocompresor del motor diésel',
            'equipment_type' => 'component',
            'parent_id' => $sistemaMotor->id,
            'observation' => 'Funcionamiento óptimo',
        ]);

        // Sub-equipos del bulldozer
        $sistemaHidraulicoB = Machine::create([
            'name' => 'Sistema Hidráulico',
            'state' => 'Mantenimiento',
            'type' => 'Sistema',
            'description' => 'Sistema hidráulico del bulldozer',
            'equipment_type' => 'subequipment',
            'parent_id' => $bulldozer->id,
            'observation' => 'En revisión',
        ]);

        $sistemaCuchilla = Machine::create([
            'name' => 'Sistema de Cuchilla',
            'state' => 'Operativo',
            'type' => 'Sistema',
            'description' => 'Sistema de control de la cuchilla',
            'equipment_type' => 'subequipment',
            'parent_id' => $bulldozer->id,
            'observation' => 'Funcionamiento normal',
        ]);

        // Ejemplo de datos adicionales en hierarchy_data
        $bombaHidraulica->update([
            'hierarchy_data' => [
                'specifications' => [
                    'pressure_rating' => '350 bar',
                    'flow_rate' => '120 L/min',
                    'displacement' => '75 cc/rev'
                ],
                'maintenance_info' => [
                    'last_service' => '2025-06-15',
                    'next_service' => '2025-12-15',
                    'service_hours' => 500
                ]
            ]
        ]);

        echo "Seeder ejecutado correctamente. Se crearon equipos con estructura jerárquica.\n";
    }
}
