<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 4:36 AM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class ChatMessages extends Model
{
    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'chat_messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'chat_id'];

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
        return $this->hasOne('App\Model\Message', 'message_id');
    }

    /*
     *
     */
    public function chat()
    {
        return $this->belongsTo('App\Model\Chat','chat_id');
    }
}