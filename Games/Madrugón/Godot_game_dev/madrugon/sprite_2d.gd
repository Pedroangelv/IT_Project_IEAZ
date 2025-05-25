extends Sprite2D
var click = 0
func _input(event):
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		if get_rect().has_point(to_local(event.position)):
			click += 1
			print("You clicked on Sprite!", click)
			if click >= 100:
				print("You won")
