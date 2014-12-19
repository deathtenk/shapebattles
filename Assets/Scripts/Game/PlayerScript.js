var accelConstant : double = 500;
var speedLimit : double = 10;
var deacceleration : double = 5;

@HideInInspector
var movement : Vector2;
@HideInInspector
var deaccelerationVolX : float;
@HideInInspector
var deAccelerationVolY : float;
@HideInInspector
var playerDead : boolean = false;

function Update () 
{
	rigidbody.AddForce(Input.GetAxis("Vertical") * Vector2(0,1) * accelConstant * Time.deltaTime);
	rigidbody.AddForce(Input.GetAxis("Horizontal") * Vector2(1,0) * accelConstant * Time.deltaTime);
	
	movement = Vector2(rigidbody.velocity.x, rigidbody.velocity.y); // speed limit
	if (movement.magnitude > speedLimit)
	{
		movement = movement.normalized;
		movement *= speedLimit;
	}
	
	rigidbody.velocity.x = movement.x;
	rigidbody.velocity.y = movement.y;
	
	rigidbody.velocity.x = Mathf.SmoothDamp(rigidbody.velocity.x, 0, deaccelerationVolX, deacceleration); //
	rigidbody.velocity.y = Mathf.SmoothDamp(rigidbody.velocity.y, 0, deAccelerationVolY, deacceleration);
	
	if (playerDead)
		MessagePlayerDie();
	
}

function OnCollisionEnter(other:Collision) 
{
	if (other.gameObject.CompareTag("enemy"))
	{
		playerDead = true;
	}
}