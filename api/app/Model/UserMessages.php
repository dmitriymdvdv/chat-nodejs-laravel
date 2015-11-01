<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 4:58 AM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class UserMessages extends Model
{
    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'users_messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['message_id','recepient_id'];
    /*
     *
     */
    public function message()
    {
        return $this->belongsTo('App\Model\Message','message_id');
    }
    /*
     *
     */
    public function users()
    {
        return $this->hasMany('App\Model\User','recepient_id');
    }
}