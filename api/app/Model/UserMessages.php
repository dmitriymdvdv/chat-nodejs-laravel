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
    public $timestamps = false;

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
    protected $fillable = ['message_id','recipient_id'];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
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
        return $this->hasMany('App\Model\User','recipient_id');
    }
}