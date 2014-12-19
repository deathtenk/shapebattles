var mouse_pos : Vector3;
var target : Transform; //Assign to the object you want to rotate
var object_pos : Vector3;
var angle : float;
 
function Update ()
{
    mouse_pos = Input.mousePosition;
    mouse_pos.z = 0.0; //The distance between the camera and object
    object_pos = Camera.main.WorldToScreenPoint(target.position);
    mouse_pos.x = mouse_pos.x - object_pos.x;
    mouse_pos.y = mouse_pos.y - object_pos.y;
    angle = Mathf.Atan2( mouse_pos.x, mouse_pos.y) * -1 * Mathf.Rad2Deg;
    transform.rotation = Quaternion.Euler(Vector3(0, 0, angle));
}