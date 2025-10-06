extends CharacterBody2D

#Coyote time
var coyote_time := 0.12  # Tiempo máximo en segundos
var coyote_timer := 0.0
var has_jumped := false
#Input/Jump buffer
var jump_buffer_time := 0.2  # tiempo en segundos que se "guarda" el intento de salto
var jump_buffer_timer := 0.0

var is_dead = false
var is_jumping = false
const SPEED = 165.0
const JUMP_VELOCITY = -267.0
const SHORT_HOP_MULTIPLIER = 0.5

@onready var animatedsprite2d = $AnimatedSprite2D
func _ready():
	add_to_group("Player")
	
func _physics_process(delta: float) -> void:
	# Add the gravity.
	if is_dead:
		velocity += get_gravity() * delta
		move_and_slide()
		return
	if not is_on_floor():
		velocity += get_gravity() * delta
	else:
		is_jumping = false
		# Justo antes de revisar si está en el suelo:
	if is_on_floor():
		coyote_timer = coyote_time
		has_jumped = false  # Puede volver a saltar
	else:
		coyote_timer -= delta
	# Handle jump.
	if Input.is_action_just_pressed("ui_accept"):
		jump_buffer_timer = jump_buffer_time
	else:
		jump_buffer_timer -= delta
	if (is_on_floor() or coyote_timer > 0) and jump_buffer_timer > 0 and not has_jumped:
		velocity.y = JUMP_VELOCITY
		is_jumping = true
		has_jumped = true
		jump_buffer_timer = 0.0
	if Input.is_action_just_released("ui_accept") and velocity.y < 0:
		velocity.y *= SHORT_HOP_MULTIPLIER

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var direction := Input.get_axis("ui_left", "ui_right")
	if direction:
		velocity.x = direction * SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)
	update_animation(direction)
	move_and_slide()
func update_animation(direction):
	if is_dead:
		return  #
	if is_jumping:
		animatedsprite2d.play("jump")
	elif direction != 0:
		animatedsprite2d.flip_h = (direction < 0)
		animatedsprite2d.play("walk ")
	else:
		animatedsprite2d.play("idle")


func _on_pitfall_body_entered(body: Node2D) -> void:
	if body == self:
		is_dead = true
		$AnimatedSprite2D.play("die")  # Asegúrate que esta animación exista
		await get_tree().create_timer(1).timeout
		get_tree().reload_current_scene()


func _on_school_gate_body_entered(body: Node2D) -> void:
	if body == self:
		var level = get_tree().current_scene  # Referencia al Level actual
		
		if level.tiene_pan and level.tiene_cartulina and level.tiene_plata:
			print("✅ Llegaste con todo, pasaste el nivel.")
			get_tree().change_scene_to_file("res://next_level.tscn")
		else:
			if not level.tiene_pan:
				print("❌ Llegaste sin desayunar.")
			elif not level.tiene_cartulina:
				print("❌ Llegaste sin la cartulina.")
			elif not level.tiene_plata:
				print("❌ Llegaste sin plata del almuerzo.")
			
			get_tree().reload_current_scene()
