// ii's Quest Menu, by @goldentrophy / @crimsoncauldron / @oblixo.
// Comment: Nice code. I love TypeScript.
// For potential updates go to https://github.com/avoicodes/TypeScript-mod-menu

declare const Il2Cpp: any;
declare const console: any;
declare const XRNode: any;

const version = "0.5";
let boardMaterial = null;
let buttonClickDelay = 0.0;
let menu = null;
let reference = null;
let referenceCollider = null;

let leftPrimary = false;
let leftSecondary = false;

let rightPrimary = false;
let rightSecondary = false;

let leftGrab = false;
let rightGrab = false;

let leftTrigger = false;
let rightTrigger = false;

let deltaTime = 0.0;
let time = 0.0;
let frameCount = 0;

let buttonSound = 8;
let LerpMenu = false;
let menuscale = 1;

let previousGhostKey = false;
let previousInvisKey = false;
let previousNoclipKey = false;
let perviousTeleportKey = false;

let walkPos = null;
let walkNormal = null;

let closePosition = null;
let tagGunDelay = 0.0;
let idGunDelay = 0.0;
let splashDelay = 0.0;
let lagGunDelay = 0.0;

let lastTime = 0.0;
let oldSlide = null;

let leftPlatform = null;
let rightPlatform = null;

let checkpoint = null;

let lineRenderHolder = null;
let isLineRenderQueued = false;
let linePool = [];

let lvT = null;
let rvT = null;

let buttonNotifications: boolean = true;

let highPunchPower = false;

let bgColor: [number, number, number, number] = [0.0, 0.7, 1.0, 1.0];
let textColor: [number, number, number, number] = [1.0, 1.0, 1.0, 1.0];
let buttonPressedColor: [number, number, number, number] = [0.0, 0.7, 1.0, 1.0];
let buttonColor: [number, number, number, number] = [0.0, 0.5, 1.0, 1.0];

let menuName: string = "Apex SMART Client";
let themeIndex = 0;
let buttonIndex = 0;

let currentNotification: string = "";
let notifactionResetTime: number = 0;

Il2Cpp.perform(() => {
    const images = {
        "Assembly-CSharp": Il2Cpp.domain.assembly("Assembly-CSharp").image,
        "UnityEngine.CoreModule": Il2Cpp.domain.assembly("UnityEngine.CoreModule").image,
        "UnityEngine.PhysicsModule": Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image,
        "UnityEngine.UIModule": Il2Cpp.domain.assembly("UnityEngine.UIModule").image,
        "UnityEngine.UI": Il2Cpp.domain.assembly("UnityEngine.UI").image,
        "UnityEngine.TextRenderingModule": Il2Cpp.domain.assembly("UnityEngine.TextRenderingModule").image,
        "PhotonUnityNetworking": Il2Cpp.domain.assembly("PhotonUnityNetworking").image,
        "Unity.TextMeshPro": Il2Cpp.domain.assembly("Unity.TextMeshPro").image,
    };

    const AssemblyCSharp = images["Assembly-CSharp"];
    const UnityEngineCore = images["UnityEngine.CoreModule"];
    const UnityEnginePhysics = images["UnityEngine.PhysicsModule"];
    const UnityEngineUI = images["UnityEngine.UI"];
    const UnityEngineUIModule = images["UnityEngine.UIModule"];
    const UnityEngineTextRendering = images["UnityEngine.TextRenderingModule"];
    const PhotonUnityNetworking = images["PhotonUnityNetworking"];
    const UnityTextMeshPro = images["Unity.TextMeshPro"];

    const EasyInputs = AssemblyCSharp.class("easyInputs.EasyInputs");
    const GorillaTaggerClass = AssemblyCSharp.class("GorillaTagger");
    const PlayerClass = AssemblyCSharp.class("GorillaLocomotion.Player");
    const VRRig = AssemblyCSharp.class("VRRig");
    const GorillaGameManager = AssemblyCSharp.class("GorillaGameManager").field("instance").value;
    const GorillaNot = AssemblyCSharp.class("GorillaNot");
    const PhotonNetworkControllerClass = AssemblyCSharp.class("GorillaNetworking.PhotonNetworkController");
    const GorillaPlayerScoreboardLine = AssemblyCSharp.class("GorillaPlayerScoreboardLine");
    const GorillaParentClass = AssemblyCSharp.class("GorillaParent");
    const GorillaReportButton = AssemblyCSharp.class("GorillaReportButton");
    const PhotonNetwork = PhotonUnityNetworking.class("Photon.Pun.PhotonNetwork");
    const RpcTarget = PhotonUnityNetworking.class("Photon.Pun.RpcTarget");

    const GameObject = UnityEngineCore.class("UnityEngine.GameObject");
    const Application = UnityEngineCore.class("UnityEngine.Application")
    const Object = UnityEngineCore.class("UnityEngine.Object");
    const SystemObject = Il2Cpp.corlib.class("System.Object");
    const Thread = Il2Cpp.corlib.class("System.Threading.Thread");
    const Vector3 = UnityEngineCore.class("UnityEngine.Vector3");
    const Quaternion = UnityEngineCore.class("UnityEngine.Quaternion");
    const Time = UnityEngineCore.class("UnityEngine.Time");
    const Resources = UnityEngineCore.class("UnityEngine.Resources");
    const Material = UnityEngineCore.class("UnityEngine.Material");
    const Renderer = UnityEngineCore.class("UnityEngine.Renderer");
    const Shader = UnityEngineCore.class("UnityEngine.Shader");
    const Color = UnityEngineCore.class("UnityEngine.Color");
    const RectTransform = UnityEngineCore.class("UnityEngine.RectTransform");
    const LineRenderer = UnityEngineCore.class("UnityEngine.LineRenderer");
    const PlayerPrefs = UnityEngineCore.class("UnityEngine.PlayerPrefs");

    const MeshCollider = UnityEnginePhysics.class("UnityEngine.MeshCollider");
    const BoxCollider = UnityEnginePhysics.class("UnityEngine.BoxCollider");
    const Collider = UnityEnginePhysics.class("UnityEngine.Collider");
    const Rigidbody = UnityEnginePhysics.class("UnityEngine.Rigidbody");
    const Physics = UnityEnginePhysics.class("UnityEngine.Physics");
    const Ray = UnityEngineCore.class("UnityEngine.Ray");
    const RaycastHit = UnityEnginePhysics.class("UnityEngine.RaycastHit");

    const Canvas = UnityEngineUIModule.class("UnityEngine.Canvas");
    const CanvasScaler = UnityEngineUI.class("UnityEngine.UI.CanvasScaler");
    const GraphicRaycaster = UnityEngineUI.class("UnityEngine.UI.GraphicRaycaster");
    const Text = UnityEngineUI.class("UnityEngine.UI.Text");
    const Font = UnityEngineTextRendering.class("UnityEngine.Font");

    const TextMeshPro = UnityTextMeshPro.class("TMPro.TextMeshPro");

    const GorillaTagger = GorillaTaggerClass.field("_instance").value;
    const GorillaParent = GorillaParentClass.field("instance").value;
    const GorillaNotInst = GorillaNot.field("instance").value;
    const NetworkSystem = NetworkSystemClass.field("Instance").value;

    const LocalRig = GorillaTagger.field("myVRRig").value; //Newer versions use offlineVRRig
    const Player = PlayerClass.field("_instance").value;
    const GorillaComputer = Il2Cpp.domain.assembly("Assembly-CSharp").image.class("GorillaNetworking.GorillaComputer").field("instance").value;

    const TextShader = Shader.method("Find").invoke(Il2Cpp.string("GUI/Text Shader"));

    const GorillaSurfaceOverride = AssemblyCSharp.class("GorillaSurfaceOverride");

    const zeroVector = Vector3.field("zeroVector").value;
    const oneVector = Vector3.field("oneVector").value;
    const identityQuaternion = Quaternion.field("identityQuaternion").value;
 
    const leftHandTransform = GorillaTagger.field("leftHandTransform").value;
    const rightHandTransform = GorillaTagger.field("rightHandTransform").value;
    const headCollider = GorillaTagger.field("headCollider").value;
    const bodyCollider = GorillaTagger.field("bodyCollider").value;

    const punchLastLeft = [zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector];
    const punchLastRight = [zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector, zeroVector];

    let LPrev = Vector3.field("zeroVector").value;
    let RPrev = Vector3.field("zeroVector").value;
    let LVel = Vector3.field("zeroVector").value;
    let RVel = Vector3.field("zeroVector").value;
    let AvgVel = Vector3.field("zeroVector").value;

    let righthand = false;

    const arial = Resources
        .method("GetBuiltinResource", 1)
        .inflate(Font)
        .invoke(Il2Cpp.string("Arial.ttf"));

    function Destroy(object) {
        Object.method("Destroy", 1).invoke(object);
    }

    function getComponent(obj: any, type) {
        return obj.method("GetComponent", 1).inflate(type).invoke();
    }

    function getComponentInParent(obj: any, type) {
        return obj.method("GetComponentInParent", 0).inflate(type).invoke();
    }

    function addComponent(obj: any, type) {
        return obj.method("AddComponent", 1).inflate(type).invoke();
    }

    function getOrAddComponent(obj: any, type) {
        let returnType = getComponent(obj, type);
        if (returnType != null && returnType != undefined) {
            return returnType
        }
        return addComponent(obj, type);
    }

    function getObject(obj) {
        return GameObject.method("Find", 1).invoke(Il2Cpp.string(obj));
    }

    function playerIsLocal(player) {
        return player.method("get_isLocal").invoke();
    }


    function setPlayerName(name) {
        GorillaComputer.field("currentName").value = Il2Cpp.string(name);
        GorillaComputer.field("savedName").value = Il2Cpp.string(name);

        PlayerPrefs.method("SetString").invoke(Il2Cpp.string("playerName"), Il2Cpp.string(name))
        PlayerPrefs.method("Save").invoke();

        PhotonNetwork.method("get_LocalPlayer").invoke().method("set_NickName").invoke(Il2Cpp.string(name));
    }

    function setPlayerColor(color) {
        PlayerPrefs.method("SetFloat").invoke(Il2Cpp.string("redValue"), color[0]);
        PlayerPrefs.method("SetFloat").invoke(Il2Cpp.string("greenValue"), color[1]);
        PlayerPrefs.method("SetFloat").invoke(Il2Cpp.string("blueValue"), color[2]);
        PlayerPrefs.method("Save").invoke();

        GorillaTagger.method("UpdateColor").invoke(color[0], color[1], color[2]);
        const objectArray = Il2Cpp.array(SystemObject, [
            Il2Cpp.reference(color[0], Il2Cpp.Type.Enum.FLOAT),
            Il2Cpp.reference(color[1], Il2Cpp.Type.Enum.FLOAT),
            Il2Cpp.reference(color[2], Il2Cpp.Type.Enum.FLOAT)
        ]);

        const method = GorillaTagger.method("get_myVRRig").invoke().method("SendRPC", 3).overload(
            "System.String",
            "Photon.Pun.RpcTarget",
            "System.Object[]");

        method.invoke(Il2Cpp.string("RPC_InitializeNoobMaterial"), 0, objectArray);
    }

    function getTransform(obj: any) {
        return obj.method("get_transform").invoke();
    }

    function world2Player(position) {
        position = Vector3.method("op_Subtraction", 2).invoke(position, getTransform(bodyCollider).method("get_position").invoke());
        position = Vector3.method("op_Addition", 2).invoke(position, getTransform(GorillaTagger).method("get_position").invoke());
        return position;
    }

    function serialize() {
        PhotonNetwork.method("RunViewUpdate").invoke();
    }

    function renderMenuText(
        canvasObject,
        text: string = "",
        color: [number, number, number, number] = [1, 1, 1, 1],
        pos = zeroVector,
        size = oneVector
    ) {
        const title = addComponent(createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(canvasObject)), Text);
        title.method("set_text").invoke(Il2Cpp.string(text));
        title.method("set_font").invoke(arial);
        title.method("set_fontSize").invoke(1);
        title.method("set_color").invoke(color);
        title.method("set_fontStyle").invoke(2);
        title.method("set_alignment").invoke(4);
        title.method("set_resizeTextForBestFit").invoke(true);
        title.method("set_resizeTextMinSize").invoke(0);

        const rectTransform = getComponent(title, RectTransform);
        rectTransform.method("set_sizeDelta").invoke(size);
        rectTransform.method("set_position").invoke(pos);
        rectTransform.method("set_rotation").invoke(Quaternion.method("Euler").invoke(180.0, 90.0, 90.0))
    }

    function createMaterial(shader) {
        const material = Material.new();
        return Material.method("CreateWithShader").invoke(material, shader);
    }

    function createObject(
        pos = zeroVector,
        rot = identityQuaternion,
        scale = oneVector,
        primitiveType: number = 3,
        colorArr: [number, number, number, number] = [1, 1, 1, 1],
        parent = null
    ) {
        const obj = GameObject.method("CreatePrimitive").invoke(primitiveType);

        const renderer = getComponent(obj, Renderer);

        if (colorArr[3] == 0) {
            renderer.method("set_enabled").invoke(false);
        } else {
            const material = renderer.method("get_material").invoke();
            material.method("set_color").invoke(colorArr);
        }

        const transform = getTransform(obj);
        if (parent != null) {
            transform.method("SetParent", 2).invoke(parent, false);
        }

        transform.method("set_position").invoke(pos);
        transform.method("set_rotation").invoke(rot);
        transform.method("set_localScale").invoke(scale);

        return obj;
    }

    function sendNotification(NotificationText: string = "", requiresReload: boolean = true, clearTime: number = 5) {
        const isOld = (currentNotification == NotificationText);
        notifactionResetTime = time + clearTime;
        currentNotification = NotificationText;
        if (requiresReload && !isOld)
            reloadMenu();
    }

    function renderMenu() {
        menu = createObject(zeroVector, identityQuaternion, [0.1, 0.3, 0.3825], 3, [0, 0, 0, 0]);
        Destroy(getComponent(menu, BoxCollider))

        const menuBackground = createObject([0.1, 0, 0], identityQuaternion, [0.1, 1, 1], 3, bgColor, getTransform(menu))
        Destroy(getComponent(menuBackground, BoxCollider))

        const canvasObject = createObject(zeroVector, identityQuaternion, oneVector, 3, [0, 0, 0, 0], getTransform(menu));
        const canvas = addComponent(canvasObject, Canvas);
        Destroy(getComponent(canvasObject, BoxCollider))

        const canvasScaler = addComponent(canvasObject, CanvasScaler);
        addComponent(canvasObject, GraphicRaycaster);
        canvas.method("set_renderMode").invoke(2);
        canvasScaler.method("set_dynamicPixelsPerUnit").invoke(1000.0);

        renderMenuText(canvasObject, menuName + `<color=grey>[</color><color=white>${currentPage + 1}</color><color=grey>]</color>`, textColor, [0.11, 0, 0.175], [1, 0.1]);

        if (time > notifactionResetTime)
            currentNotification = "";
        renderMenuText(canvasObject, currentNotification, textColor, [0.11, 0, 0.275], [1, 0.1]);

        const disconnectButton = createObject([0.1, 0.0, 0.225], identityQuaternion, [0.09, 0.9, 0.08], 3, buttonColor, getTransform(menu));
        disconnectButton.method("set_name").invoke(Il2Cpp.string("@Disconnect"));

        addComponent(disconnectButton, GorillaReportButton);
        getComponent(disconnectButton, BoxCollider).method("set_isTrigger").invoke(true);
        renderMenuText(canvasObject, "Disconnect", textColor, [0.11, 0, 0.225], [1, 0.1]);

        const returnButton = createObject([0.1, -0.175, -0.225], identityQuaternion, [0.09, 0.09, 0.09], 3, buttonColor, getTransform(menu));
        returnButton.method("set_name").invoke(Il2Cpp.string("@GlobalReturn"));

        addComponent(returnButton, GorillaReportButton);
        getComponent(returnButton, BoxCollider).method("set_isTrigger").invoke(true);
        renderMenuText(canvasObject, "<", textColor, [0.11, -0.175, -0.225], [1, 0.1]);

        {
            const pageButton = createObject([0.1, 0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@PreviousPage"));

            addComponent(pageButton, GorillaReportButton);
            getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, "<", textColor, [0.11, 0.2, 0], [1, 0.1]);
        }

        {
            const pageButton = createObject([0.1, -0.2, 0], identityQuaternion, [0.09, 0.2, 0.9], 3, buttonColor, getTransform(menu));
            pageButton.method("set_name").invoke(Il2Cpp.string("@NextPage"));

            addComponent(pageButton, GorillaReportButton);
            getComponent(pageButton, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, ">", textColor, [0.11, -0.2, 0], [1, 0.1]);
        }

        let i = 0;
        const targetMods = buttons[currentCategory]
            .slice(currentPage * 8)
            .slice(0, 8);

        targetMods.forEach((buttonData, index) => {
            const button = createObject([0.105, 0, 0.13 - (i * 0.04)], identityQuaternion, [0.09, 0.9, 0.08], 3, buttonColor, getTransform(menu));
            button.method("set_name").invoke(Il2Cpp.string("@" + buttonData.buttonText));

            addComponent(button, GorillaReportButton);
            getComponent(button, BoxCollider).method("set_isTrigger").invoke(true);
            renderMenuText(canvasObject, buttonData.buttonText, textColor, [0.11, 0, 0.13 - (i * 0.04)], [1, 0.1]);
            updateButtonColor(button, buttonData);
            i++;
        });
        
        recenterMenu();
    }

    function renderReference() {
        if (righthand) {
            reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.01], 0, bgColor, leftHandTransform)
            referenceCollider = getComponent(reference, Collider);

            getTransform(reference).method("set_localPosition").invoke([0.01, -0.117, 0.05]);
            reference.method("set_layer").invoke(2);
            addComponent(reference, Rigidbody).method("set_isKinematic").invoke(true);
        }
        else {
            reference = createObject(zeroVector, identityQuaternion, [0.01, 0.01, 0.01], 0, bgColor, rightHandTransform)
            referenceCollider = getComponent(reference, Collider);

            getTransform(reference).method("set_localPosition").invoke([0.01, -0.117, 0.05]);
            reference.method("set_layer").invoke(2);
            addComponent(reference, Rigidbody).method("set_isKinematic").invoke(true);
        }
    }

    let gunLocked = false;
    let lockTarget = null;
    let GunPointer = null;
    let GunLine = null;
    function renderGun(overrideLayerMask = null) {
        const StartPosition = rightHandTransform.method("get_position").invoke();
        const Direction = rightHandTransform.method("get_forward").invoke();

        const DirectionDivided = Vector3.method("op_Division").invoke(Direction, 4);
        const rayStartPosition = Vector3.method("op_Addition").invoke(StartPosition, DirectionDivided);

        const layerMask = overrideLayerMask || -3180559;

        const hits = Physics.method("RaycastAll", 4).invoke(
            rayStartPosition,
            Direction,
            512.0,
            layerMask
        );

        let finalDistance = Infinity;
        let finalRay = null;
        for (const hit of hits) {
            const distance = Vector3.method("Distance").invoke(hit.method("get_point").invoke(), StartPosition);
            if (distance < finalDistance) {
                finalRay = hit;
                finalDistance = distance;
            }
        }

        let EndPosition;
        if (gunLocked) {
            EndPosition = getTransform(lockTarget).method("get_position").invoke();
        } else {
            EndPosition = finalRay.method("get_point").invoke();
        }

        if (Vector3.method("op_Equality").invoke(EndPosition, zeroVector)) {
            const farDirection = Vector3.method("op_Multiply").invoke(Direction, 512);
            EndPosition = Vector3.method("op_Addition").invoke(StartPosition, farDirection);
        }

        if (GunPointer == null) {
            GunPointer = createObject(EndPosition, identityQuaternion, [0.1, 0.1, 0.1], 0, [1, 1, 1, 1]);
        }

        GunPointer.method("SetActive").invoke(true);
        const pointerTransform = getTransform(GunPointer);
        pointerTransform.method("set_position").invoke(EndPosition);

        const PointerRenderer = getComponent(GunPointer, Renderer);
        const material = PointerRenderer.method("get_material").invoke();

        material.method("set_shader").invoke(TextShader);

        const pointerColor = (gunLocked || rightTrigger) ? buttonPressedColor : buttonColor;
        material.method("set_color").invoke(pointerColor);

        const collider = getComponent(GunPointer, Collider);
        if (collider != null) {
            Destroy(collider);
        }

        if (GunLine == null) {
            const lineObj = createObject(zeroVector, identityQuaternion, oneVector, 0, [0, 0, 0, 0]);
            GunLine = addComponent(lineObj, LineRenderer);
        } else {
            GunLine.method("get_gameObject").invoke().method("SetActive").invoke(true);
        }

        const lineMaterial = GunLine.method("get_material").invoke();
        lineMaterial.method("set_shader").invoke(TextShader);

        GunLine.method("set_startColor").invoke(bgColor);
        GunLine.method("set_endColor").invoke(bgColor);

        const lineWidth = 0.025;
        GunLine.method("set_startWidth").invoke(lineWidth);
        GunLine.method("set_endWidth").invoke(lineWidth);

        GunLine.method("set_positionCount").invoke(2);
        GunLine.method("set_useWorldSpace").invoke(true);

        GunLine.method("set_numCapVertices").invoke(10);

        GunLine.method("SetPosition").invoke(0, StartPosition);
        GunLine.method("SetPosition").invoke(1, EndPosition);

        if (rightTrigger || gunLocked) {
            const Step = 10;
            GunLine.method("set_positionCount").invoke(Step);
            GunLine.method("SetPosition").invoke(0, StartPosition);

            for (let i = 1; i < (Step - 1); i++) {
                const t = i / (Step - 1);
                const Position = Vector3.method("Lerp").invoke(StartPosition, EndPosition, t);

                const randomValue = Math.random();
                let offset = zeroVector;

                if (randomValue > 0.75) {
                    offset = [
                        (Math.random() * 0.2) - 0.1,
                        (Math.random() * 0.2) - 0.1,
                        (Math.random() * 0.2) - 0.1
                    ];
                }

                const finalPosition = Vector3.method("op_Addition").invoke(Position, offset);
                GunLine.method("SetPosition").invoke(i, finalPosition);
            }

            GunLine.method("SetPosition").invoke(Step - 1, EndPosition);
        }

        return { ray: finalRay, gunPointer: GunPointer };
    }

    function recenterMenu() {
        const menuTransform = getTransform(menu);
        let targetPos, targetRot;

        if (righthand) {
            targetPos = rightHandTransform.method("get_position").invoke();
            targetRot = rightHandTransform.method("get_rotation").invoke();
            targetRot = Quaternion.method("op_Multiply").invoke(targetRot, Quaternion.method("Euler").invoke(0, 0, 180));
        } else {
            targetPos = leftHandTransform.method("get_position").invoke();
            targetRot = leftHandTransform.method("get_rotation").invoke();
            targetRot = Quaternion.method("op_Multiply").invoke(targetRot, Quaternion.method("Euler").invoke(0, 0, 0));
        }

        if (LerpMenu) {
            const menuPos = menuTransform.method("get_position").invoke();
            const distance = Vector3.method("Distance").invoke(menuPos, zeroVector);
            if (distance < 1) {
                menuTransform.method("set_position").invoke(targetPos);
                menuTransform.method("set_rotation").invoke(targetRot);
            } else {
                const newPos = Vector3.method("Lerp").invoke(menuPos, targetPos, deltaTime * 15);
                menuTransform.method("set_position").invoke(newPos);
                const newRot = Quaternion.method("Slerp").invoke(menuTransform.method("get_rotation").invoke(), targetRot, deltaTime * 15);
                menuTransform.method("set_rotation").invoke(newRot);
            }
        } else {
            menuTransform.method("set_position").invoke(targetPos);
            menuTransform.method("set_rotation").invoke(targetRot);
        }
    }

    function reloadMenu() {
        if (menu != null) {
            Object.method("Destroy", 1).invoke(menu);
            menu = null;
        }
    }

    function updateButtonColor(button, buttonData) {
        const RendererClass = Il2Cpp.domain
            .assembly("UnityEngine.CoreModule")
            .image
            .class("UnityEngine.Renderer");

        const renderer = getComponent(button, RendererClass);
        if (!renderer) {
            return;
        }

        const material = renderer.method("get_material").invoke();
        material.method("set_color").invoke(buttonData.enabled ? buttonPressedColor : buttonColor);
    }

    function playButtonSound() {
        LocalRig.method("PlayHandTap").invoke(buttonSound, false, 0.3); //Update to PlayHandTapLocal if on a newer version. 
        if (righthand) {
            GorillaTagger.method("StartVibration").invoke(true, 0.5, 0.075);
        }
        else {
            GorillaTagger.method("StartVibration").invoke(false, 0.5, 0.075);
        }
    }

    function toggleColliders(enabled) {
        const meshColliders = Object.method("FindObjectsOfType").inflate(MeshCollider).invoke();

        for (let i = 0; i < meshColliders.length; i++) {
            const meshCollider = meshColliders.get(i);
            meshCollider.method("set_enabled").invoke(enabled);
        }
    }

    interface ButtonInfoConfig {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        isTogglable?: boolean;
        toolTip?: string;
        enabled?: boolean;
    }

    class ButtonInfo {
        buttonText: string;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        isTogglable: boolean;
        toolTip?: string;
        enabled: boolean;

        constructor(config: ButtonInfoConfig) {
            this.buttonText = config.buttonText;
            this.method = config.method;
            this.enableMethod = config.enableMethod;
            this.disableMethod = config.disableMethod;
            this.isTogglable = config.isTogglable ?? true;
            this.toolTip = config.toolTip ?? null;
            this.enabled = config.enabled ?? false;
        }
    }

    let currentCategory = 0;
    let currentPage = 0;

    const buttons: ButtonInfo[][] = [
        [ // Main [0]
            new ButtonInfo({
                buttonText: "Settings",
                method: () => { currentCategory = 2; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the settings category."
            }),
            new ButtonInfo({
                buttonText: "Join Discord",
                method: () => { Application.method("OpenURL").invoke(Il2Cpp.string("https://discord.gg/8RxXrATDSS")); },
                isTogglable: false,
                toolTip: "Joins the discord."
            }),
            new ButtonInfo({
                buttonText: "Credits",
                method: () => { currentCategory = 3; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the credits category."
            }),
            new ButtonInfo({
                buttonText: "Room/Game",
                method: () => { currentCategory = 4; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the room/game category."
            }),
            new ButtonInfo({
                buttonText: "Movement",
                method: () => { currentCategory = 5; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the movement category."
            }),
            new ButtonInfo({
                buttonText: "Player",
                method: () => { currentCategory = 6; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the player category."
            }),
            new ButtonInfo({
                buttonText: "Basic",
                method: () => { currentCategory = 7; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the overpowered category."
            }),
            new ButtonInfo({
                buttonText: "Overpowered",
                method: () => { currentCategory = 8; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the revamp category."
            }),
            new ButtonInfo({
                buttonText: "Revamp",
                method: () => { currentCategory = 9; currentPage = 0 },
                isTogglable: false,
                toolTip: "Opens the visual category."
            }),
        ],

        [ // Hidden [1]
            new ButtonInfo({
                buttonText: "Disconnect",
                method: () => PhotonNetwork.method("Disconnect", 0).invoke();
                isTogglable: false,
                toolTip: "Disconnects you from the room."
            }),
            new ButtonInfo({
                buttonText: "PreviousPage",
                method: () => {
                    const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                    currentPage--;
                    if (currentPage < 0)
                        currentPage = lastPage;
                },
                isTogglable: false
            }),
            new ButtonInfo({
                buttonText: "NextPage",
                method: () => {
                    const lastPage = Math.ceil(buttons[currentCategory].length / 8) - 1;

                    currentPage++;
                    currentPage %= lastPage + 1;
                },
                isTogglable: false
            }),
            new ButtonInfo({
                buttonText: "GlobalReturn",
                method: () => {
                    currentCategory = 0;
                    currentPage = 0;
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            })
        ],

        [ // Settings [2]
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Change Menu Theme",
                method: () => {
                    themeIndex++;
                    themeIndex %= 10;

                    switch (themeIndex) {
                        case 0:
                            bgColor = [0.25, 0.25, 0.25, 1.0];
                            textColor = [1.0, 1.0, 1.0, 1.0];

                            buttonColor = [0.0, 0.0, 0.0, 1.0];
                            buttonPressedColor = [0.5, 0.5, 0.5, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 1:
                            bgColor = [1.0, 0.0, 0.0, 1.0];
                            textColor = [1.0, 1.0, 1.0, 1.0];

                            buttonColor = [0.0, 0.0, 0.0, 1.0];
                            buttonPressedColor = [1.0, 0.0, 0.0, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 2:
                            bgColor = [0.0, 1.0, 0.0, 1.0];
                            textColor = [1.0, 1.0, 1.0, 1.0];

                            buttonColor = [0.0, 0.0, 0.0, 1.0];
                            buttonPressedColor = [0.0, 1.0, 0.0, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 3:
                            bgColor = [0.0, 0.0, 1.0, 1.0];
                            textColor = [1.0, 1.0, 1.0, 1.0];

                            buttonColor = [0.0, 0.0, 0.0, 1.0];
                            buttonPressedColor = [0.0, 0.0, 1.0, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 4:
                            bgColor = [0.5, 0.0, 0.5, 1.0];
                            textColor = [1.0, 0.9, 1.0, 1.0];

                            buttonColor = [0.25, 0.0, 0.25, 1.0];
                            buttonPressedColor = [0.7, 0.0, 0.7, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 5:
                            bgColor = [0.0, 0.7, 0.7, 1.0];
                            textColor = [1.0, 0.2, 0.8, 1.0];

                            buttonColor = [0.0, 0.3, 0.3, 1.0];
                            buttonPressedColor = [1.0, 0.0, 0.7, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 6:
                            bgColor = [0.9, 0.7, 0.1, 1.0];
                            textColor = [0.0, 0.0, 0.0, 1.0];

                            buttonColor = [0.2, 0.2, 0.2, 1.0];
                            buttonPressedColor = [1.0, 0.84, 0.0, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 7:
                            bgColor = [0.7, 0.9, 1.0, 1.0];
                            textColor = [0.1, 0.2, 0.4, 1.0];

                            buttonColor = [0.5, 0.7, 0.9, 1.0];
                            buttonPressedColor = [0.2, 0.4, 0.8, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 8:
                            bgColor = [0.6, 0.0, 0.0, 1.0];
                            textColor = [1.0, 0.7, 0.2, 1.0];

                            buttonColor = [0.2, 0.0, 0.0, 1.0];
                            buttonPressedColor = [1.0, 0.3, 0.0, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                        case 9:
                            bgColor = [0.05, 0.05, 0.1, 1.0];
                            textColor = [0.6, 0.8, 1.0, 1.0];

                            buttonColor = [0.1, 0.1, 0.2, 1.0];
                            buttonPressedColor = [0.4, 0.6, 1.0, 1.0];
                            boardMaterial.method("set_color").invoke(bgColor);
                            break;
                    }
                },
                isTogglable: false,
                toolTip: "Changes the theme of the menu."
            }),
            new ButtonInfo({
                buttonText: "Change Button Sound",
                method: () => {
                    buttonIndex++;
                    buttonIndex %= 5;

                    switch (buttonIndex) {
                        case 0:
                            buttonSound = 8;
                            break;
                        case 1:
                            buttonSound = 66;
                            break;
                        case 2:
                            buttonSound = 67;
                            break;
                        case 3:
                            buttonSound = 84;
                            break;
                        case 4:
                            buttonSound = 106;
                            break;
                        case 5:
                            buttonSound = 189;
                            break;
                    }
                },
                isTogglable: false,
                toolTip: "Changes the button sound."
            }),
            new ButtonInfo({
                buttonText: "Change Menu Scale",
                method: () => {
                    menuscale += 0.1;
                    if (menuscale > 1.5) {
                        menuscale = 0.3;
                    }
                },
                isTogglable: false,
                toolTip: "Changes the button sound."
            }),
            new ButtonInfo({
                buttonText: "Button Notifications",
                enabled: true,
                method: () => buttonNotifications = true,
                disableMethod: () => buttonNotifications = false,
                toolTip: "Shows notifications when clicking menu buttons, may cause lag."
            }),
            new ButtonInfo({
                buttonText: "Right Hand",
                method: () => righthand = true,
                disableMethod: () => righthand = false,
                toolTip: "Lets you switch menu hand."
            }),
            new ButtonInfo({
                buttonText: "Lerp Menu",
                method: () => LerpMenu = true,
                disableMethod: () => LerpMenu = false,
                toolTip: "Makes the menu Lerped."
            }),
        ],

        [ // Movement Mods [3]
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),

            new ButtonInfo({
                buttonText: "iiDk/all of the other contributors - Mostly the entire menu"
            }),

            new ButtonInfo({
                buttonText: "Apex/Oblixo - Mod creater, Menu maker",
            }),
        ],

        [ // Room/Game [4]
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Disconnect",
                method: () => {
                    PhotonNetwork.method("Disconnect", 0).invoke();
                },
                isTogglable: false,
                toolTip: "Disconnects you from the game."
            }),
            new ButtonInfo({
                buttonText: "Grip Disconnect",
                method: () => {
                    if (leftGrab)
                    {
                        PhotonNetwork.method("Disconnect", 0).invoke();
                    }
                },
                isTogglable: true,
                toolTip: "Disconnects you when you press your Left Grip."
            }),
            new ButtonInfo({
                buttonText: "Join Random Public",
                method: () => {
                    PhotonNetwork.method("JoinRandomRoom", 0).invoke();
                },
                isTogglable: false,
                toolTip: "Joins a random public."
            }),
            new ButtonInfo({
                buttonText: "Grip Join Random Public",
                method: () => {
                    if (rightGrab)
                    {
                        PhotonNetwork.method("JoinRandomRoom", 0).invoke();
                    }
                },
                isTogglable: true,
                toolTip: "Joins a random public when you press your Right Grip."
            }),
             new ButtonInfo({
                buttonText: "Quit Game",
                method: () => {
                    Application.method("Quit").invoke();
                },
                isTogglable: false,
                toolTip: "Jx"
            }),
        ],

        [ // Movement [5]
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Speedboost",
                method: () => {
                        Player.field("jumpMultiplier").value = 10;
                        Player.field("maxJumpSpeed").value = 10;
                },
                disableMethod: () => {
                    Player.field("jumpMultiplier").value = 1.1;
                    Player.field("maxJumpSpeed").value = 6.5;
                },
                isTogglable: true,
                toolTip: "Gives you a speed boost."
            }),
            new ButtonInfo({
                buttonText: "Slide Control",
                isTogglable: true,
                method: () => {
                        Player.field("slideControl").value = 10;
                },
                disableMethod: () => {
                    Player.field("slideControl").value = 0.005;
                },
                toolTip: "Gives you slide control on ice."
            }),
            new ButtonInfo({
                buttonText: "Fly",
                method: () => {
                    if (rightPrimary)
                    {
                        const bfbfdbfxshb = bodyCollider.method("get_attachedRigidbody");
                        bfbfdbfxshb.method("set_velocity").invoke(Vector3.field("zeroVector").value);
                        const transform = getTransform(Player);
                        let forward = getTransform(headCollider).method("get_forward").invoke();

                        let position = transform.method("get_position").invoke();
                        forward = Vector3.method("op_Multiply", 2).invoke(forward, 25.0 * deltaTime);

                        position = Vector3.method("op_Addition", 2).invoke(position, forward);

                        transform.method("set_position").invoke(position);
                    }
                },
                isTogglable: true,
                toolTip: "Lets you fly around with your A."
            }),
            new ButtonInfo({
                buttonText: "Tag Freeze",
                method: () => {
                    Player.field("tagFreeze").value = true;
                },
                isTogglable: true,
                toolTip: "Gives you tag freeze"
            }),
            new ButtonInfo({
                buttonText: "No Tag Freeze",
                method: () => {
                    Player.field("tagFreeze").value = false;
                },
                isTogglable: true,
                toolTip: "Gives you no tag freeze"
            }),
        ],
        [ // Rig [6]
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Long Arms",
                method: () => {
                    getTransform(Player).method("set_localScale").invoke([1.3, 1.3, 1.3]);
                },
                disableMethod: () => {
                    getTransform(Player).method("set_localScale").invoke([1.0, 1.0, 1.0]); //Also could do oneVector
                }
                toolTip: "Gives you long arms."
            }),

            new ButtonInfo({
                buttonText: "Ghost Monke",
                method: () => {
                    if (leftPrimary)
                    {
                        LocalRig.method("set_enabled").invoke(false);
                    }

                },
                toolTip: "Turns you into a ghost when pressing X."
            }),

            new ButtonInfo({
                buttonText: "Invis Monke",
                method: () => {
                    if (rightSecondary && !previousInvisKey) {
                        LocalRig.method("set_enabled").invoke(!LocalRig.method("get_enabled").invoke());
                    }
                    if (!LocalRig.method("get_enabled").invoke()) {
                        getTransform(LocalRig).method("set_position").invoke([0, -99999, 0]);
                    }
                    previousInvisKey = rightSecondary;

                },
                toolTip: "Turns you invisible when pressing B."
            }),
        ],
        [ // Basic [7]
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Platforms",
                method: () => {
                    if (leftGrab || rightGrab)
                        {
                            if (leftPlatform == null || rightPlatform == null)
                            {
                                const pos = leftHandTransform.method("get_position").invoke();
                                const pos2 = rightHandTransform.method("get_position").invoke();
                                leftPlatform = createObject(pos, leftHandTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2],  3, bgColor);
                                rightPlatform = createObject(pos, rightHandTransform.method("get_rotation").invoke(), [0.025, 0.15, 0.2],  3, bgColor);
                                pos.field("y").value -= 0.1;
                                pos.field("z").value += 0.1;
                                pos.field("y").value -= 0.1;
                                pos.field("z").value += 0.1;
                            }
                        }
                        else
                        {
                            if (leftPlatform != null || rightPlatform != null)
                            {
                                Destroy(leftPlatform);
                                Destroy(rightPlatform);
                                leftPlatform = null;
                                rightPlatform = null;
                            }
                        }
                },
                isTogglable: true,
                toolTip: "Spawns platforms under your hands."
            }),

            new ButtonInfo({
                buttonText: "Noclip",
                method: () => {
                    if (rightTrigger)
                    {
                        toggleColliders(false);
                    }
                    else
                    {
                        toggleColliders(true);
                    }
                },
                isTogglable: true,
                toolTip: "Allows you to phase through objects with your Right Trigger."
            }),
            new ButtonInfo({
                buttonText: "Become Oblixo",
                method: () => {
                    setPlayerName("OBLIXO");
                    setPlayerColor(0.2, 0.5, 0.9);
                },
                isTogglable: true,
                toolTip: "Changes your name to OBLIXO and color code to blue."
            }),
        ],
        [ // Overpowered [8]
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),

            new ButtonInfo({
                buttonText: "Set Master <color=red>[D]</color>",
                method: () => {
                    PhotonNetwork.method("SetMasterClient").invoke(PhotonNetwork.method("get_LocalPlayer"));
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Crash All [M]",
                method: () => {
                    if (rightTrigger)
                    {
                        PhotonNetwork.method("DestroyAll").invoke();
                        PhotonNetwork.method("DestroyAll").invoke();
                        PhotonNetwork.method("DestroyAll").invoke();
                    }
                },
                isTogglable: true,
                toolTip: "Crashes everyone in the server. Needs master."
            }),
            new ButtonInfo({
                buttonText: "Ground Sound Spam",
                method: () => {
                    if (leftGrab) {
                        const objectArray = Il2Cpp.array(SystemObject, [
                            8,
                            false,
                            999999999
                        ]);

                        const method = LocalRig.method("get_photonView").method("RPC", 3).overload(
                            "System.String",
                            "Photon.Pun.RpcTarget",
                            "System.Object[]");

                        method.invoke(Il2Cpp.string("PlayHandTap"), 0, objectArray);
                    }
                },
                isTogglable: true,
                toolTip: "Spams the ground sound with your left grip."
            }),
            new ButtonInfo({
                buttonText: "Crystal Sound Spam",
                method: () => {
                    if (leftGrab) {
                        const objectArray = Il2Cpp.array(SystemObject, [
                            20,
                            false,
                            999999999
                        ]);

                        const method = LocalRig.method("get_photonView").method("RPC", 3).overload(
                            "System.String",
                            "Photon.Pun.RpcTarget",
                            "System.Object[]");

                        method.invoke(Il2Cpp.string("PlayHandTap"), 0, objectArray);
                    }
                },
                isTogglable: true,
                toolTip: "Spams the crystal sound with your left grip."
            }),
            new ButtonInfo({
                buttonText: "Snow Sound Spam",
                method: () => {
                    if (leftGrab) {
                        const objectArray = Il2Cpp.array(SystemObject, [
                            147,
                            false,
                            999999999
                        ]);

                        const method = LocalRig.method("get_photonView").method("RPC", 3).overload(
                            "System.String",
                            "Photon.Pun.RpcTarget",
                            "System.Object[]");

                        method.invoke(Il2Cpp.string("PlayHandTap"), 0, objectArray);
                    }
                },
                isTogglable: true,
                toolTip: "Spams the snow sound with your left grip."
            }),
            
        ],
        [
            new ButtonInfo({
                buttonText: "Return to Main",
                method: () => {
                    currentCategory = 0; currentPage = 0
                },
                isTogglable: false,
                toolTip: "Returns you back to the main category."
            }),
            new ButtonInfo({
                buttonText: "Snowball Spam",
                method: () => {
                    if (rightGrab) {
                        const objectArray = Il2Cpp.array(SystemObject, [
                            rightHandTransform.method("get_position").value, 
                            [10, 10, 10]
                            32,
                            -1,
                            true,
                            100000
                        ]);

                        const method = GorillaGameManager.method("get_photonView").method("RPC", 3).overload(
                            "System.String",
                            "Photon.Pun.RpcTarget",
                            "System.Object[]");

                        method.invoke(Il2Cpp.string("LaunchProjectileRPC"), 0, objectArray);
                    }
                },
                isTogglable: true,
                toolTip: "Spams snowballs with your right Grip."
            }),
        ]
    ];

    let buttonMap: Map<string, ButtonInfo> = new Map();
    buttons.flat().forEach(button => {
        buttonMap.set(button.buttonText, button);
    });

    function getIndex(buttonText: string): ButtonInfo {
        return buttonMap.get(buttonText);
    }

    const ButtonActivation = GorillaReportButton.method("OnTriggerEnter");
    ButtonActivation.implementation = function (collider) {
        const rawName = this.method("get_name").invoke().toString();

        if (rawName.length > 1 && rawName[1] == "@") {
            if (collider.handle.equals(referenceCollider.handle)) {
                const goName = rawName.substring(2, rawName.length - 1);
                const _time = Time.method("get_time").invoke();

                if (_time > buttonClickDelay) {
                    buttonClickDelay = _time + 0.2;

                    const button = getIndex(goName)
                    playButtonSound();
                    if (button) {
                        if (button.isTogglable) {
                            button.enabled = !button.enabled;

                            reloadMenu();
                            if (button?.enabled) {
                                if (button.toolTip && buttonNotifications)
                                    sendNotification("<color=grey>[</color><color=green>ENABLE</color><color=grey>]</color> " + button.toolTip, false);
                                button.enableMethod?.();
                            } else {
                                if (button.toolTip && buttonNotifications)
                                    sendNotification("<color=grey>[</color><color=red>DISABLE</color><color=grey>]</color> " + button.toolTip, false);
                                button?.disableMethod?.();
                            }

                        } else {
                            reloadMenu();
                            if (button.toolTip && buttonNotifications)
                                sendNotification("<color=grey>[</color><color=green>ENABLE</color><color=grey>]</color> " + button.toolTip, false);
                            button?.method?.();
                        }
                    }
                }
            }

            return;
        }

        return this.method("OnTriggerEnter").invoke(collider);
    };

    const LateUpdate = Player.method("LateUpdate");

    LateUpdate.implementation = function () {
        leftPrimary = EasyInputs.method("GetPrimaryButtonDown").invoke(0);
        leftSecondary = EasyInputs.method("GetSecondaryButtonDown").invoke(0);

        rightPrimary = EasyInputs.method("GetPrimaryButtonDown").invoke(1);
        rightSecondary = EasyInputs.method("GetSecondaryButtonDown").invoke(1);

        leftGrab = EasyInputs.method("GetGripButtonDown").invoke(0);
        rightGrab = EasyInputs.method("GetGripButtonDown").invoke(1);

        leftTrigger = EasyInputs.method("GetTriggerButtonDown").invoke(0) > 0.5;
        rightTrigger = EasyInputs.method("GetTriggerButtonDown").invoke(1) > 0.5;

        deltaTime = Time.method("get_deltaTime").method();
        time = Time.method("get_time").method();
        frameCount++;

        if ((righthand && rightSecondary) || (!righthand && leftSecondary)) {
            if (currentNotification != "" && time > notifactionResetTime)
                reloadMenu();

            if (menu == null) {
                renderMenu();
            } else {
                recenterMenu();
            }
        } else {
            if (menu != null) {
                Destroy(menu);
                menu = null;
            }
        }

        if (menu == null) {
            if (reference != null) {
                Destroy(reference);
                reference = null;
            }
        } else {
            if (reference == null) {
                renderReference();
            }
        }

        try {
            if (GunPointer != null) {
                if (!(GunPointer.method("get_activeSelf").invoke())) {
                    Destroy(GunPointer);
                    GunPointer = null;
                }
                else
                    GunPointer.method("SetActive").invoke(false);
            }

            let lineObj = GunLine.method("get_gameObject").invoke();
            if (lineObj != null) {
                if (!(lineObj.method("get_activeSelf").invoke())) {
                    Destroy(lineObj);
                    GunLine = null;
                }
                else
                    lineObj.method("SetActive").invoke(false);
            }
        } catch { }

        buttons.flat()
            .filter(button => button.enabled)
            .forEach(button => {
                if (button.method) {
                    try {
                        button.method();
                    } catch (error) {
                        console.error(`Error executing method for button '${button.buttonText || 'unnamed'}':`, error);
                        console.error('Error stack:', error.stack);
                        console.error('Button object:', button);

                        if (error.stack) {
                            const stackLines = error.stack.split('\n');
                            if (stackLines.length > 1) {
                                console.error('Error occurred at:', stackLines[1].trim());
                            }
                        }
                    }
                }
            });

        return LateUpdate.invoke();
    };

    console.log(`i think we put ASCII art or sum here
    Apex Smart Client QUEST ${version}
    Compiled ${new Date().toISOString()}
`);
});
