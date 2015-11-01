<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 4:54 AM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['message','date_of_creation'];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['id','user_id'];
    /*
     *
     */
    public function users()
    {
        return $this->hasMany('App\Model\User','user_id');
    }
}