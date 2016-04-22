<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 4:51 AM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{

    public $timestamps = false;
    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'chats';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','user_id','name','description', 'is_private'];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['pivot'];
    /*
     * relations
     */
    public function messages()
    {
        return $this->belongsToMany('App\Model\Messages', 'chat_messages', 'chat_id', 'message_id');
    }
    /*
     *
     */
    public function users()
    {
        return $this->belongsToMany('App\Model\User', 'users_to_chats');
    }
    /*
     *
     */
    public function author()
    {
        return $this->belongsTo('App\Model\User','user_id');
    }
}
