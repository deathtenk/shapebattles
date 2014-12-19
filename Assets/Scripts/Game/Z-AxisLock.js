var startingZPosition : double;

function Start ()
{
	startingZPosition = transform.position.z;
}

function Update () 
{
	if (transform.position.z > startingZPosition || transform.position.z < startingZPosition)
		transform.position.z = startingZPosition;
}