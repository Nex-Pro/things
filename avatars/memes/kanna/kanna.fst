name = Kanna
type = body+head
scale = 1
filename = kanna.fbx
joint = jointRoot = Hips
joint = jointLean = Spine
joint = jointNeck = Neck
joint = jointHead = Head
joint = jointEyeLeft = LeftEye
joint = jointEyeRight = RightEye
joint = jointRightHand = RightHand
joint = jointLeftHand = LeftHand
freeJoint = RightArm
freeJoint = RightForeArm
freeJoint = LeftArm
freeJoint = LeftForeArm

jointMap = flow_PigtailLeft_00 = Pigtail_L
jointMap = flow_PigtailLeft_01 = Pigtail2_L
jointMap = flow_PigtailLeft_02 = Pigtail3_L
jointMap = flow_PigtailLeft_03 = Pigtail4_L
jointMap = flow_PigtailLeft_04 = Pigtail5_L
jointMap = flow_PigtailLeft_05 = Pigtail6_L

jointMap = flow_PigtailRight_00 = Pigtail_R
jointMap = flow_PigtailRight_01 = Pigtail2_R
jointMap = flow_PigtailRight_02 = Pigtail3_R
jointMap = flow_PigtailRight_03 = Pigtail4_R
jointMap = flow_PigtailRight_04 = Pigtail5_R
jointMap = flow_PigtailRight_05 = Pigtail6_R

jointMap = flow_Tailbone_00 = Tailbone
jointMap = flow_Tailbone_01 = Tailbone2
jointMap = flow_Tailbone_02 = Tailbone3
jointMap = flow_Tailbone_03 = Tailbone4
jointMap = flow_Tailbone_04 = Tailbone5

flowPhysicsData = {"PigtailLeft":{"active":true,"damping":0.85,"delta":0.55,"gravity":-0.0096,"inertia":0.15,"radius":0.04,"stiffness":0}}
flowPhysicsData = {"PigtailRight":{"active":true,"damping":0.85,"delta":0.55,"gravity":-0.0096,"inertia":0.15,"radius":0.04,"stiffness":0}}
flowPhysicsData = {"Tailbone":{"active":true,"damping":0.85,"delta":0.55,"gravity":-0.0096,"inertia":0.3,"radius":0.04,"stiffness":0}}
flowCollisionsData = {"Hips":{"offset":{"x":0,"y":-0.2,"z":0},"radius":0.28,"type":"sphere"}}
flowCollisionsData = {"LeftArm":{"offset":{"x":0,"y":0.02,"z":0},"radius":0.05,"type":"sphere"}}
flowCollisionsData = {"RightArm":{"offset":{"x":0,"y":0.02,"z":0},"radius":0.05,"type":"sphere"}}
flowCollisionsData = {"Spine2":{"offset":{"x":0,"y":0,"z":0},"radius":0.2,"type":"sphere"}}



bs = JawOpen = vrc.v_aa = 2.5
bs = EyeBlink_L = vrc.blink_left = 1
bs = EyeBlink_R = vrc.blink_right = 1