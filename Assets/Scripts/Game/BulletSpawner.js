var fireRate = 0.5;
var pew : AudioClip;
private var nextFire = 0.0;
private var sound : boolean = false;

function Start()
{
	Messenger.instance.Listen("gun", this);
}


function Update () 
{
	if ( Input.GetButton("Fire1") && IsOkToShoot())
		Shoot();
}

function IsOkToShoot() : boolean
{
	var itsOk : boolean = false;
	if (Time.time > nextFire)
	{
		nextFire = Time.time + fireRate;
		itsOk = true;
	}
	return itsOk;
}

function Shoot()
{
	MessagePlayerFire();
}

function _PlayerFire(msg:MessagePlayerFire)
{
	AudioSource.PlayClipAtPoint(pew, transform.position);
}