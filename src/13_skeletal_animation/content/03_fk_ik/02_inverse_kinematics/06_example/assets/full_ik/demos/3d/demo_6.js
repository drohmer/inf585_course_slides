tell("Demo 6 - Freely Rotating Local Hinges");

var numChains = 3;
var rotStep = 360 / numChains;
var baseBoneConstraintAngleDegs = 20;
var hingeRotationAxis, hingeReferenceAxis;
var color = 0xFF0000;

for (var i = 0; i < numChains; i++ ){

    switch (i){
        case 0: color = 0xFF0000; hingeRotationAxis = FIK.X_AXE; hingeReferenceAxis = FIK.Z_AXE; break;
        case 1: color = 0x00FF00; hingeRotationAxis = FIK.Y_AXE; hingeReferenceAxis = FIK.X_AXE; break;
        case 2: color = 0x0000FF; hingeRotationAxis = FIK.Z_AXE; hingeReferenceAxis = FIK.Y_AXE; break;
    }

    var chain = new FIK.Chain3D( color );

    var startLoc = new FIK.V3(0, 0, -40);
    startLoc = FIK._Math.rotateYDegs( startLoc, rotStep * i );
    var endLoc = startLoc.plus( defaultBoneDirection.multiply(defaultBoneLength));

    var basebone = new FIK.Bone3D( startLoc, endLoc );
    chain.addBone( basebone );

    for (var j = 0; j < 7; j++) {

        //chain.addConsecutiveHingedBone( defaultBoneDirection, defaultBoneLength, 'local', hingeRotationAxis, 90, 90, hingeReferenceAxis );

        if (j % 2 == 0) chain.addConsecutiveFreelyRotatingHingedBone( defaultBoneDirection, defaultBoneLength, 'local', hingeRotationAxis );
        else chain.addConsecutiveBone( defaultBoneDirection, defaultBoneLength );

    };

    solver.add( chain, target, true );

}