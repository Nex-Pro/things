/*
Sign Chat System V1

Created by Matti 'Menithal' Lahtinen
on  22/4/2017


Scripts Released Under CC Attribution 4.0
http://creativecommons.org/licenses/by/4.0/

*/

(function() {
    const COMMS_HTML = "comms-panel.html";
    const COMMS_TOGGLE_BUTTON = "com.highfidelity.comms";
    const PAGE = Script.resolvePath("panel.html?fox");
    const SOUND_URL = Script.resolvePath("annoyingSound.wav");
    const SOUND =  SoundCache.getSound(SOUND_URL);

    var commsPanel = new OverlayWebWindow({
        title: "Sign",
        source: PAGE,
        width: 645,
        height: 145,
        visible: false
    });
    // Doing it this way  instead of override as I only want to animate the hands and shoulders.
    // Everything else should be controlled by
    const SIGN_HOLD_OVERRIDE = {
        "RightShoulder": {
            "rotation": {
                "x": 0.6832819581031799,
                "y": -0.3121102750301361,
                "z": 0.30965983867645264,
                "w": 0.5829440355300903
            }
        },
        "RightArm": {
            "rotation": {
                "x": 0.5846556425094604,
                "y": 0.1475808471441269,
                "z": -0.06535462290048599,
                "w": 0.795063853263855
            }
        },
        "RightForeArm": {
            "rotation": {
                "x": -0.00031876255525276065,
                "y": -0.16043314337730408,
                "z": 0.9519948959350586,
                "w": -0.2607048451900482
            }
        },
        "RightHand": {
            "rotation": {
                "x": -0.021042268723249435,
                "y": 0.8354313969612122,
                "z": -0.11353000998497009,
                "w": -0.5373290777206421
            }
        },
        "RightHandPinky1": {
            "rotation": {
                "x": 0.5877652764320374,
                "y": 0.10517330467700958,
                "z": 0.16788679361343384,
                "w": 0.7844007611274719
            }
        },
        "RightHandPinky2": {
            "rotation": {
                "x": 0.3521757423877716,
                "y": -0.024318130686879158,
                "z": -0.06422679126262665,
                "w": 0.9334108829498291
            }
        },
        "RightHandPinky3": {
            "rotation": {
                "x": 0.2013445645570755,
                "y": 0.00153422262519598,
                "z": 0.007464886177331209,
                "w": 0.9794908761978149
            }
        },
        "RightHandPinky4": {
            "rotation": {
                "x": -4.656746099840348e-9,
                "y": 5.113109295962204e-7,
                "z": -0.007571881636977196,
                "w": 0.9999713897705078
            }
        },
        "RightHandRing1": {
            "rotation": {
                "x": 0.44056767225265503,
                "y": 0.018007496371865273,
                "z": 0.0760660246014595,
                "w": 0.8943096399307251
            }
        },
        "RightHandRing2": {
            "rotation": {
                "x": 0.5147166848182678,
                "y": -0.023719554767012596,
                "z": -0.03940964117646217,
                "w": 0.8561255931854248
            }
        },
        "RightHandRing3": {
            "rotation": {
                "x": 0.34649088978767395,
                "y": 0.0005861443351022899,
                "z": 0.0015863741282373667,
                "w": 0.9380518198013306
            }
        },
        "RightHandRing4": {
            "rotation": {
                "x": -2.3283067140944524e-10,
                "y": -3.073365206773815e-8,
                "z": 0.0004951103474013507,
                "w": 0.9999998807907104
            }
        },
        "RightHandMiddle1": {
            "rotation": {
                "x": 0.40669187903404236,
                "y": -0.045242566615343094,
                "z": -0.05833231657743454,
                "w": 0.9105779528617859
            }
        },
        "RightHandMiddle2": {
            "rotation": {
                "x": 0.5738037824630737,
                "y": 0.006440863944590092,
                "z": 0.009156951680779457,
                "w": 0.8189163208007812
            }
        },
        "RightHandMiddle3": {
            "rotation": {
                "x": 0.41892609000205994,
                "y": -0.03620114177465439,
                "z": 0.033084072172641754,
                "w": 0.9066950082778931
            }
        },
        "RightHandMiddle4": {
            "rotation": {
                "x": 7.334266882708107e-8,
                "y": 3.539074810987586e-8,
                "z": -0.005236915312707424,
                "w": 0.9999862909317017
            }
        },
        "RightHandIndex1": {
            "rotation": {
                "x": 0.40735098719596863,
                "y": -0.065496526658535,
                "z": -0.1038934513926506,
                "w": 0.9049760103225708
            }
        },
        "RightHandIndex2": {
            "rotation": {
                "x": 0.5766692161560059,
                "y": 0.005024328362196684,
                "z": 0.007397673092782497,
                "w": 0.8169288039207458
            }
        },
        "RightHandIndex3": {
            "rotation": {
                "x": 0.4170638620853424,
                "y": 0.014079841785132885,
                "z": 0.030660780146718025,
                "w": 0.9082507491111755
            }
        },
        "RightHandIndex4": {
            "rotation": {
                "x": -2.9105189369715845e-9,
                "y": -2.263218732423411e-7,
                "z": -0.00963226705789566,
                "w": 0.9999536275863647
            }
        },
        "RightHandThumb1": {
            "rotation": {
                "x": -0.0783928781747818,
                "y": -0.3033908009529114,
                "z": -0.26653754711151123,
                "w": 0.9114638566970825
            }
        },
        "RightHandThumb2": {
            "rotation": {
                "x": 0.003102937713265419,
                "y": 0.07382386177778244,
                "z": 0.0052537559531629086,
                "w": 0.9972526431083679
            }
        },
        "RightHandThumb3": {
            "rotation": {
                "x": 0.004044059664011002,
                "y": -0.049435727298259735,
                "z": 0.007246010005474091,
                "w": 0.9987428188323975
            }
        },
        "RightHandThumb4": {
            "rotation": {
                "x": -0.00009282465180149302,
                "y": -0.016580352559685707,
                "z": -0.00014316955639515072,
                "w": 0.999862551689148
            }
        },
        "LeftShoulder": {
            "rotation": {
                "x": 0.6832818388938904,
                "y": 0.3121103048324585,
                "z": -0.30965977907180786,
                "w": 0.5829442143440247
            }
        },
        "LeftArm": {
            "rotation": {
                "x": 0.5846556425094604,
                "y": -0.1475808471441269,
                "z": 0.06535463780164719,
                "w": 0.795063853263855
            }
        },
        "LeftForeArm": {
            "rotation": {
                "x": 0.0003187136317137629,
                "y": -0.16043312847614288,
                "z": 0.9519950151443481,
                "w": 0.2607044279575348
            }
        },
        "LeftHand": {
            "rotation": {
                "x": 0.021042242646217346,
                "y": 0.8354315161705017,
                "z": -0.11353003978729248,
                "w": 0.5373289585113525
            }
        },
        "LeftHandPinky1": {
            "rotation": {
                "x": 0.5877652764320374,
                "y": -0.1051732748746872,
                "z": -0.16788679361343384,
                "w": 0.7844007611274719
            }
        },
        "LeftHandPinky2": {
            "rotation": {
                "x": 0.3521757125854492,
                "y": 0.024318108335137367,
                "z": 0.06422680616378784,
                "w": 0.9334108829498291
            }
        },
        "LeftHandPinky3": {
            "rotation": {
                "x": 0.2013445794582367,
                "y": -0.0015342043479904532,
                "z": -0.007464886177331209,
                "w": 0.9794908761978149
            }
        },
        "LeftHandPinky4": {
            "rotation": {
                "x": -6.519446760222536e-9,
                "y": -5.159675993127166e-7,
                "z": 0.007571880705654621,
                "w": 0.9999713897705078
            }
        },
        "LeftHandRing1": {
            "rotation": {
                "x": 0.4405677318572998,
                "y": -0.018007498234510422,
                "z": -0.07606605440378189,
                "w": 0.8943096399307251
            }
        },
        "LeftHandRing2": {
            "rotation": {
                "x": 0.514716625213623,
                "y": 0.023719556629657745,
                "z": 0.03940964862704277,
                "w": 0.8561256527900696
            }
        },
        "LeftHandRing3": {
            "rotation": {
                "x": 0.3464909493923187,
                "y": -0.0005861498066224158,
                "z": -0.0015863613225519657,
                "w": 0.9380518198013306
            }
        },
        "LeftHandRing4": {
            "rotation": {
                "x": 1.1641533292916506e-9,
                "y": 3.119930980233221e-8,
                "z": -0.000495114189106971,
                "w": 0.9999998807907104
            }
        },
        "LeftHandMiddle1": {
            "rotation": {
                "x": 0.40669190883636475,
                "y": 0.045242562890052795,
                "z": 0.05833230912685394,
                "w": 0.9105779528617859
            }
        },
        "LeftHandMiddle2": {
            "rotation": {
                "x": 0.5738037824630737,
                "y": -0.006440863944590092,
                "z": -0.009156947024166584,
                "w": 0.8189163208007812
            }
        },
        "LeftHandMiddle3": {
            "rotation": {
                "x": 0.4189261496067047,
                "y": 0.03620114177465439,
                "z": -0.03308408707380295,
                "w": 0.9066950082778931
            }
        },
        "LeftHandMiddle4": {
            "rotation": {
                "x": 7.706800886353449e-8,
                "y": -3.678774973536747e-8,
                "z": 0.005236915312707424,
                "w": 0.9999862909317017
            }
        },
        "LeftHandIndex1": {
            "rotation": {
                "x": 0.40735098719596863,
                "y": 0.0654965192079544,
                "z": 0.1038934588432312,
                "w": 0.9049760103225708
            }
        },
        "LeftHandIndex2": {
            "rotation": {
                "x": 0.5766692161560059,
                "y": -0.005024324636906385,
                "z": -0.00739767961204052,
                "w": 0.8169288039207458
            }
        },
        "LeftHandIndex3": {
            "rotation": {
                "x": 0.41706404089927673,
                "y": -0.014079844579100609,
                "z": -0.030660782009363174,
                "w": 0.9082506895065308
            }
        },
        "LeftHandIndex4": {
            "rotation": {
                "x": 2.2119948095422615e-9,
                "y": 2.291159972855894e-7,
                "z": 0.009632258675992489,
                "w": 0.9999536275863647
            }
        },
        "LeftHandThumb1": {
            "rotation": {
                "x": -0.0783928781747818,
                "y": 0.3033908009529114,
                "z": 0.26653754711151123,
                "w": 0.9114638566970825
            }
        },
        "LeftHandThumb2": {
            "rotation": {
                "x": 0.0031029637902975082,
                "y": -0.07382386177778244,
                "z": -0.005253762938082218,
                "w": 0.9972526431083679
            }
        },
        "LeftHandThumb3": {
            "rotation": {
                "x": 0.004044055473059416,
                "y": 0.04943571612238884,
                "z": -0.007246027700603008,
                "w": 0.9987428188323975
            }
        },
        "LeftHandThumb4": {
            "rotation": {
                "x": -0.00009281721577281132,
                "y": 0.01658034510910511,
                "z": 0.0001431676937500015,
                "w": 0.999862551689148
            }
        }
    };

    function setJoints(joints){
        for (var joint in joints) {
            if(joints.hasOwnProperty(joint)){
                MyAvatar.setJointRotation(joint, joints[joint].rotation);
            }
        }
    }

    function cleanUpSigns(){
        // SignBoard
        var entities = Entities.findEntities(MyAvatar.position, 10);
        entities.forEach(function (id) {
            var props = Entities.getEntityProperties(id, ["parentID","name"]);
            if(props.name === "SignBoard" && props.parentID === MyAvatar.sessionUUID){
                Entities.deleteEntity(id);
            }
        });
    }

    var sign;
    var date = new Date();
    var frontCamera = false;
    var oldCamera = { entity: null, cameraEntity: ""};

    commsPanel.webEventReceived.connect(function(data) {
        var currentDate = new Date();
        var difference = currentDate - date;

        var message = JSON.parse(data);
        if(message.type === "textUpdate"){
            if(Entities.getEntityProperties(sign)) {
                Entities.editEntity(sign, {text:message.message});
            }else {
                Entities.editEntity(sign, {text:message.message});
            }
        } else if (message.type === "textScale") {
            Entities.editEntity(sign, {lineHeight:parseInt(message.message)/1000});
        }else  if(message.type === "returnHit" && difference > 5000){
            date = currentDate;
            Audio.playSound(SOUND, {
                volume: 0.25,
                position: MyAvatar.position
            });
        } else if (message.type === "clearSign") {
            if(isActive){
                toggle();
            }
        } else if (message.type === "altCamera") {
            frontCamera = !frontCamera;

            if(frontCamera) {
                oldCamera.mode = Camera.getModeString();
                oldCamera.cameraEntity = Camera.cameraEntity;
                /* // This part is bugged, Issue #10263
                Camera.setModeString("entity");

                var offset = Vec3.multiplyQbyV(MyAvatar.orientation, {x:0, y: 1, z: -2});
                var position = Vec3.sum(MyAvatar.position, offset);
                var cameraProp = {
                  type: "Box",
                  position: position,
                  parentID: MyAvatar.sessionUUID,
                  rotation: Quat.lookAt(position, MyAvatar.position, Vec3.UP)};
                var cam = Entities.addEntity(cameraProp, true);
                Camera.cameraEntity = cam;
                */
                var offset = Vec3.multiplyQbyV(MyAvatar.orientation, {x:0, y: 2, z: -3});
                var position = Vec3.sum(MyAvatar.position, offset);

                Camera.setModeString("independent");
                Camera.setPosition(position);
                Camera.lookAt(MyAvatar.position);

                //Camera.cameraEntity = this.cameraEntity.id;
            }else {
                Camera.setModeString(oldCamera.mode);
                //var camera = Camera.cameraEntity;
                Camera.cameraEntity = oldCamera.cameraEntity;
                // Entities.deleteEntity(camera);
            }
        }
    });

    var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
    var icon = Script.resolvePath("speech-bubble-white.svg?4fsd3f5133");
    var activeIcon = Script.resolvePath("speech-bubble-outline.svg?33dssff134");
    var activeButton = tablet.addButton({
        icon: icon,
        activeIcon: activeIcon,
        text: "SIGN",
        isActive: false,
        sortOrder: 11
    });

    function skelyChange() {

        Script.setTimeout(function () {

            MyAvatar.clearJointsData();

            setJoints(SIGN_HOLD_OVERRIDE);

            Script.setTimeout(function () {
                var leftHandPosition = Vec3.subtract(MyAvatar.position, MyAvatar.getJointPosition("LeftHand"));

                var rightHandPosition = Vec3.subtract(MyAvatar.position, MyAvatar.getJointPosition("RightHand"));
                var between = Vec3.mix(leftHandPosition, rightHandPosition, 0.5)

                between.y=between.y+0.20;

                Entities.editEntity(sign,{
                    parentJointIndex: MyAvatar.getJointIndex("Spine2"),
                    position: Vec3.sum(Vec3.subtract(MyAvatar.position, between), Vec3.multiplyQbyV(MyAvatar.orientation, {x:0,y:0,z:-0.085})),
                    localRotation: Quat.normalize({})
                });
            },300);
        },1000)

    }

    var isActive = false;
    var toggle = function() {
        isActive = !isActive;
        commsPanel.setVisible(isActive);
        activeButton.editProperties({isActive: isActive});
        if(isActive){

            MyAvatar.skeletonChanged.connect(skelyChange);

            setJoints(SIGN_HOLD_OVERRIDE);
            Script.setTimeout(function(){
                var leftHandPosition = Vec3.subtract(MyAvatar.position, MyAvatar.getJointPosition("LeftHand"));

                var rightHandPosition = Vec3.subtract(MyAvatar.position, MyAvatar.getJointPosition("RightHand"));
                var between = Vec3.mix(leftHandPosition, rightHandPosition, 0.5)

                between.y=between.y+0.20;

                var signEntity = {
                    type: "Text",
                    name: "SignBoard",
                    text: "",
                    parentID: MyAvatar.sessionUUID,
                    parentJointIndex: MyAvatar.getJointIndex("Spine2"),
                    position: Vec3.sum(Vec3.subtract(MyAvatar.position, between), Vec3.multiplyQbyV(MyAvatar.orientation, {x:0,y:0,z:-0.085})),
                    dimensions: { x:1, y: .5, z: 0.1},
                    localRotation: Quat.normalize({}),
                    lineHeight: 0.10
                };
                sign = Entities.addEntity(signEntity, true);
            }, 100);
        } else {
            MyAvatar.skeletonChanged.disconnect(skelyChange);
            commsPanel.setURL("about:blank");
            commsPanel.setURL(PAGE);
            MyAvatar.clearJointsData();
            Entities.deleteEntity(sign);
            cleanUpSigns();
        }
    };

    activeButton.clicked.connect(toggle);
    Script.scriptEnding.connect(function() {
        if(frontCamera){
            Camera.setModeString(oldCamera.mode);
            Camera.cameraEntity = oldCamera.cameraEntity;
        }
        activeButton.clicked.disconnect(toggle);
        MyAvatar.clearJointsData();

        tablet.removeButton(activeButton);
        Entities.deleteEntity(sign);
        cleanUpSigns();
    })
})();
