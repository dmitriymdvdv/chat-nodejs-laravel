<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/31/15
 * Time: 9:22 PM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UserRestoreHashes extends Model
{
    protected $table = 'user_restore_hashes';

    protected $fillable = ['restore_token','expired'];

    protected $hidden = ['user_id'];
    /*
     *
     */
    public function user()
    {
        return $this->belongsTo('App\Model\User','user_id');
    }
}