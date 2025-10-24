<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Property;
use Illuminate\Support\Facades\Auth;
class PropertyController extends Controller
{
    // get all property
    public function getProperty (Request $request){
        $permissions = User::with('roles')->with('permission')->where('id', $request->user()->id)->get();
        $arrayList = array();
        foreach($permissions[0]->permission as $param){
            $data = Permission::findOrFail($param->permission_id);
            $param->permission_id =  $data->name;
        }
        $permissions[0]->permission = [];
        return $permissions;
    }
    // save property user's
    public function SaveProperty (Request $request){
        $property = new Property;
        
        return $permissions;
    }
}