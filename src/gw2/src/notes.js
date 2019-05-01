/* eslint-disable */
/**

Ojo con esto
Gw2.exe+C7475C - 85 F6                 - test esi,esi
Gw2.exe+C7475E - 75 83                 - jne Gw2.exe+C746E3


For the advanced view model
01B37ADC

From TermCheck
Gw2.exe+C7472F - B9 F4532F01           - mov ecx,Gw2.exe+10253F4

to
Gw2.exe+C74766 - 5F                    - pop edi



Gw2.exe+C74734 - E8 F7C56AFF           - call Gw2.exe+320D30
Gw2.exe+C74739 - F3 0F10 45 0C         - movss xmm0,[ebp+0C]
Gw2.exe+C7473E - 8D 43 01              - lea eax,[ebx+01]
Gw2.exe+C74741 - 57                    - push edi
Gw2.exe+C74742 - 51                    - push ecx
Gw2.exe+C74743 - 89 43 04              - mov [ebx+04],eax
Gw2.exe+C74746 - 8B CE                 - mov ecx,esi
Gw2.exe+C74748 - F3 0F11 04 24         - movss [esp],xmm0
Gw2.exe+C7474D - E8 5E680100           - call Gw2.exe+C8AFB0
Gw2.exe+C74752 - 8B 45 C4              - mov eax,[ebp-3C]
Gw2.exe+C74755 - A8 01                 - test al,01
Gw2.exe+C74757 - 75 07                 - jne Gw2.exe+C74760
Gw2.exe+C74759 - 8B 75 C4              - mov esi,[ebp-3C]
Gw2.exe+C7475C - 85 F6                 - test esi,esi
Gw2.exe+C7475E - 75 83                 - jne Gw2.exe+C746E3
Gw2.exe+C74760 - 8B 45 C0              - mov eax,[ebp-40]
Gw2.exe+C74763 - 8D 4D C0              - lea ecx,[ebp-40]



For the field of view:

Gw2.exe+6C8976 - E8 4582FAFF           - call Gw2.exe+670BC0
Gw2.exe+6C897B - FF 75 FC              - push [ebp-04]
Gw2.exe+6C897E - 8B C8                 - mov ecx,eax
Gw2.exe+6C8980 - 6A 03                 - push 03
Gw2.exe+6C8982 - 8B 10                 - mov edx,[eax]
Gw2.exe+6C8984 - FF 92 B0000000        - call dword ptr [edx+000000B0]
Gw2.exe+6C898A - 8B 8B B4040000        - mov ecx,[ebx+000004B4]
Gw2.exe+6C8990 - 8B 01                 - mov eax,[ecx] << breakpoint here and check eax
Gw2.exe+6C8992 - FF 90 78010000        - call dword ptr [eax+00000178]
Gw2.exe+6C8998 - 85 C0                 - test eax,eax

enable spectate Gw2.exe+17E1F84
AgenctCanBeSpectate

hover character Gw2.exe+188CA20

This bytecode

00 00 00 00 FF FF 00 00 00 00 00 00 FF FF 00 00 00 00 FF FF 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 30 DB FC 2D 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 34 36 1B 02 97 00 00 00 01 00 00 00 00 24 02 00 96 03 00 00 00 00 00 00 54 36 1B 02 7C 36 1B 02 3C 03 2C 05 03 00 00 00 98 11 10 00 00 00 00 80 0C 00 00 00 2C 35 2E 54 20 35 2E 54 01 00 00 00 88 36 1B 02 00 37 1B 02 54 37 1B 02 70 37 1B 02 C4 37 1B 02 F4 37 1B 02 1C 38 1B 02 84 38 1B 02 34 39 1B 02 4C 39 1B 02 90 39 1B 02 A4 39 1B 02 BC 39 1B 02 CC 39 1B 02 58 3A 1B 02 FF 0F 00 00 01 00 00 00 F4 8E 8C 26 00 8F 8C 26 0C 8F 8C 26 F0 8E 8C 26 15 00 00 00 01 00 00 00 0C 00 00 00 00 00 00 00 01 00 00 00 D0 E1 6B 51



map time of day ->
Gw2.exe+BD95E0 - 55                    - push ebp
Gw2.exe+BD95E1 - 8B EC                 - mov ebp,esp
Gw2.exe+BD95E3 - F3 0F10 4D 08         - movss xmm1,[ebp+08]
Gw2.exe+BD95E8 - 0F2F 0D B4180301      - comiss xmm1,[Gw2.exe+FF18B4]
Gw2.exe+BD95EF - 56                    - push esi
Gw2.exe+BD95F0 - 8B F1                 - mov esi,ecx
Gw2.exe+BD95F2 - 72 1A                 - jb Gw2.exe+BD960E
Gw2.exe+BD95F4 - F3 0F10 05 94220301   - movss xmm0,[Gw2.exe+FF2294]
Gw2.exe+BD95FC - 0F2F C1               - comiss xmm0,xmm1
Gw2.exe+BD95FF - 72 0D                 - jb Gw2.exe+BD960E
Gw2.exe+BD9601 - F3 0F11 8E CC190000   - movss [esi+000019CC],xmm1
Gw2.exe+BD9609 - 5E                    - pop esi
Gw2.exe+BD960A - 5D                    - pop ebp
Gw2.exe+BD960B - C2 0400               - ret 0004
Gw2.exe+BD960E - 68 6E030000           - push 0000036E
Gw2.exe+BD9613 - BA 14F62001           - mov edx,Gw2.exe+11CF614
Gw2.exe+BD9618 - B9 A8F62001           - mov ecx,Gw2.exe+11CF6A8
Gw2.exe+BD961D - E8 2E6174FF           - call Gw2.exe+31F750
Gw2.exe+BD9622 - F3 0F10 45 08         - movss xmm0,[ebp+08]
Gw2.exe+BD9627 - F3 0F11 86 CC190000   - movss [esi+000019CC],xmm0
Gw2.exe+BD962F - 5E                    - pop esi
Gw2.exe+BD9630 - 5D                    - pop ebp
Gw2.exe+BD9631 - C2 0400               - ret 0004




/////

array of model tree

00 00 80 3F 80 A9 F4 42 80 A9 F4 42 19 1D 84 42 19 1D 84 42 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 29 88 93 9F 00 32 00 8C 00 00 00 00 08 01 2D 00 FF FF 7F 3F 00 00 00 00 00 00 00 00 3B 1C AC C6 00 00 00 00 FF FF 7F 3F 00 00 00 00 14 E8 F4 45 00 00 00 00 00 00 00 00 FF FF 7F 3F 10 15 F7 C4 FF FF 7F 3F 00 00 00 00 00 00 00 00 3B 1C AC C6 00 00 00 00 FF FF 7F 3F 00 00 00 00 14 F8 F4 45 00 00 00 00 00 00 00 00 FF FF 7F 3F 10 15 F7 C4 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 39 88 83 9F 00 33 00 88 00 00 00 00 08 01 2D 00 00 00 00 00 00 00 01 00 00 00 00 00 01 00 00 00 55 54 FF D5 41 E0 27 63 B2 5F 4D 60 00 00 00 00 EA C9 16 C6 BA B9 CC 45 A0 C2 97 C3 00 00 80 3F 40 24 39 44 60 70 86 44 A0 7D 34 44 A0 7D 34 44 EA C9 16 C6 BA B9 CC 45 A0 C2 97 C3 00 00 80 3F 40 24 39 44 60 70 86 44 A0 7D

In order to keep this freezed, you have to deactive MapEnvironment instructions
79 70 65 20 3C 20 4D 41 50 5F 45 4E 56 5F 48 41 5A 45 5F 43 4F 4C 4F 52 53 00 00 65 6E 76 00 74 69 6D 65 20 3E 3D 20 30 2E 30 66 20 26 26 20 74 69 6D 65 20 3C 3D 20 31 2E 30 66 00 00 00 00 6D 5F 74 65 78 52 65 66 43 6F 75 6E 74 00
Bye bye colors:
Gw2.exe+C430E0 - 55                    - push ebp
Gw2.exe+C430E1 - 8B EC                 - mov ebp,esp
Gw2.exe+C430E3 - 8B 55 08              - mov edx,[ebp+08]
Gw2.exe+C430E6 - 8B 02                 - mov eax,[edx]
Gw2.exe+C430E8 - 89 01                 - mov [ecx],eax
Gw2.exe+C430EA - 8B 42 04              - mov eax,[edx+04]


Relacionado con el environment!!

Gw2.exe+35163A - F3 0F10 41 10         - movss xmm0,[ecx+10]
Gw2.exe+35163F - F3 0F11 45 BC         - movss [ebp-44],xmm0
Gw2.exe+351644 - F3 0F10 41 14         - movss xmm0,[ecx+14]
Gw2.exe+351649 - F3 0F11 45 CC         - movss [ebp-34],xmm0
Gw2.exe+35164E - F3 0F10 41 18         - movss xmm0,[ecx+18]
Gw2.exe+351653 - F3 0F11 45 DC         - movss [ebp-24],xmm0
Gw2.exe+351658 - F3 0F10 41 1C         - movss xmm0,[ecx+1C]
Gw2.exe+35165D - F3 0F11 45 EC         - movss [ebp-14],xmm0
Gw2.exe+351662 - F3 0F10 41 20         - movss xmm0,[ecx+20]
Gw2.exe+351667 - F3 0F11 45 C0         - movss [ebp-40],xmm0
Gw2.exe+35166C - F3 0F10 41 24         - movss xmm0,[ecx+24]
Gw2.exe+351671 - F3 0F11 45 D0         - movss [ebp-30],xmm0
Gw2.exe+351676 - F3 0F10 41 28         - movss xmm0,[ecx+28]
Gw2.exe+35167B - F3 0F11 45 E0         - movss [ebp-20],xmm0
Gw2.exe+351680 - F3 0F10 41 2C         - movss xmm0,[ecx+2C]
Gw2.exe+351685 - F3 0F11 45 F0         - movss [ebp-10],xmm0
Gw2.exe+35168A - F3 0F10 41 30         - movss xmm0,[ecx+30]
Gw2.exe+35168F - F3 0F11 45 C4         - movss [ebp-3C],xmm0
Gw2.exe+351694 - F3 0F10 41 34         - movss xmm0,[ecx+34]
Gw2.exe+351699 - F3 0F11 45 D4         - movss [ebp-2C],xmm0
Gw2.exe+35169E - F3 0F10 41 38         - movss xmm0,[ecx+38]
Gw2.exe+3516A3 - F3 0F11 45 E4         - movss [ebp-1C],xmm0
Gw2.exe+3516A8 - F3 0F10 41 3C         - movss xmm0,[ecx+3C]
Gw2.exe+3516AD - F3 0F11 45 F4         - movss [ebp-0C],xmm0
Gw2.exe+3516B2 - C7 45 C8 00000000     - mov [ebp-38],00000000
Gw2.exe+3516B9 - 8D 95 7CFFFFFF        - lea edx,[ebp-00000084]
Gw2.exe+3516BF - C7 45 D8 00000000     - mov [ebp-28],00000000
Gw2.exe+3516C6 - C7 45 E8 00000000     - mov [ebp-18],00000000
Gw2.exe+3516CD - C7 45 F8 0000803F     - mov [ebp-08],3F800000 : [00000000]
Gw2.exe+3516D4 - 74 0A                 - je Gw2.exe+3516E0
Gw2.exe+3516D6 - 8D 49 44              - lea ecx,[ecx+44]
Gw2.exe+3516D9 - E8 A2BFFFFF           - call Gw2.exe+34D680
Gw2.exe+3516DE - EB 11                 - jmp Gw2.exe+3516F1
Gw2.exe+3516E0 - 6A 00                 - push 00
Gw2.exe+3516E2 - 52                    - push edx
Gw2.exe+3516E3 - 8D 91 04010000        - lea edx,[ecx+00000104]
Gw2.exe+3516E9 - 8D 49 44              - lea ecx,[ecx+44]
Gw2.exe+3516EC - E8 FFBFFFFF           - call Gw2.exe+34D6F0
Gw2.exe+3516F1 - 8D 85 7CFFFFFF        - lea eax,[ebp-00000084]




/////



.rdata:01567B00 0000000A C MapUpdate
.rdata:01567B0C 00000009 C MapAreas
.rdata:01567B18 00000009 C MapAudio
.rdata:01567B24 00000009 C MapBlock
.rdata:01567B30 00000009 C MapDecal
.rdata:01567B3C 0000000F C MapEnvironment
.rdata:01567B4C 00000010 C MapRiverAdvance
.rdata:01567B5C 00000010 C MapWaterAdvance
.rdata:01567B6C 0000000F C MapZoneAdvance
.rdata:01567B7C 0000000A C MapLights
.rdata:01567B88 0000000B C MapShadows
.rdata:01567B94 0000000D C MapTrnUpdate
.rdata:01567BA4 00000012 C MapCubeMapAdvance
.rdata:01567BB8 0000000F C MapPropAdvance
.rdata:01567BC8 0000000F C MapDebugUpdate

.rdata:01568178 0000001D C mapRect.x1 - mapRect.x0 >= 0
.rdata:01568198 0000001D C mapRect.y1 - mapRect.y0 >= 0
.rdata:015685F0 00000018 C layer < MAP_TILE_LAYERS
.rdata:01594D74 00000026 C ..\\..\\..\\Engine\\Map\\Zones\\ZnModel.cpp
.rdata:01594F5C 0000002A C ..\\..\\..\\Engine\\Map\\Zones\\ZnPlacement.cpp
.rdata:01594FAC 00000026 C ..\\..\\..\\Engine\\Map\\Zones\\ZnChunk.cpp
.rdata:015950F8 00000025 C ..\\..\\..\\Engine\\Map\\Zones\\ZnZone.cpp
.rdata:015951DC 00000026 C ..\\..\\..\\Engine\\Map\\River\\RiRiver.cpp
.rdata:0156CEEC 0000002C C src.skyModeTexCount == MAP_ENV_SKYBOX_MODES
.rdata:0156CE24 00000030 C srcLayer->attributeCount == MAP_ENV_GROUP_TYPES
.rdata:0156CAE8 0000002C C ..\\..\\..\\Engine\\Map\\CubeMap\\CubeMapUtil.cpp
.rdata:0156CD00 00000031 C ..\\..\\..\\Engine\\Map\\Environment\\EnvDataStrip.cpp
.rdata:0156B7D4 0000002E C ..\\..\\..\\Engine\\Map\\Environment\\EnvSkybox.cpp

.rdata:015681B8 00000013 C adjDims->x <= 4096
.rdata:015681CC 00000013 C adjDims->y <= 4096

Assertion: worldFacing: 0.865847 0.500308 0.000000 moving: 0.000000 0.000000 0.000000 inputMove: 0.000000 0.001338 0.000000
File: ..\..\..\Game\Movement\Cli\MvCliContext.cpp(1174)

Gw2.exe+5DC634 - C7 46 0C 01000000     - mov [esi+0C],00000001

 */
  /**
   * Every new path this piece of code
   * automatically finds all the offsets that
   * the tool uses
   */
  //const gw2Module     = process.getModules()[0];
  //const gw2ModulePath = gw2Module._path;
  //const moduleHash    = md5File.sync(gw2ModulePath);
  //if (!BinOffsets[moduleHash]) {
  //  return player.findAndSaveAssemblyInstructions(moduleHash);
  //}
  // MORRIÑA
  //camera.moveTo( 39055.41796875, 23341.974609375, -1196.4619140625, 39069.77734375, 23439.611328125, -1212.5758056640625, 100);
  //camera.moveTo( 38638.171875, 22638.052734375, -1050.3909912109375, 38733.02734375, 22606.689453125, -1053.845458984375, 100);
  //camera.moveTo( 39578.77734375, 22386.6875, -1240.2200927734375, 39573.91796875, 22339.908203125, -1151.97900390625, 2000);
  //camera.moveTo( 39200.15625, 22371.2578125, -1095.904052734375, 39104.6953125, 22342.029296875, -1090.6513671875, 100);
  //camera.moveTo( 38027.8984375, 21766.146484375, -1048.16552734375, 37979.11328125, 21679.640625, -1036.74462890625, 100);
  //camera.moveTo( 37809.76171875, 20925.111328125, -874.0870971679688, 37832.640625, 20843.833984375, -820.5414428710938, 100);
  //camera.moveTo( 37521.47265625, 20368.599609375, -779.92529296875, 37472.8671875, 20281.703125, -789.103759765625, 2000);
  //camera.moveTo( 36983.0546875, 19810.64453125, -1355.8322143554688, 36885.484375, 19832.009765625, -1351.6099853515625);
  //camera.printDebugInfo();
  //console.log('window');
  //console.log(window.getBounds());
  //console.log('window');
  //global.process.exit(0);

  // spectate.disableSpectateMode();
  // player.enablePlayerMovement();

  // player.advanceInDirection();
  //
  // spectate.enableSpectateMode();
  // player.disablePlayerMovement();
  // camera.enableCameraControls();
  //camera.printDebugInfo();

  //
  // var from = { x: -19716.70703125, y: 15282.9462890625, z: -849.1732788085938, lookx: -19365.123046875, looky: 14815.9541015625, lookz: -839.6096801757812 };
  // var to   = { x: -18548.638671875, y: 13386.4609375, z: -888.8230590820312, lookx: -18275.9453125, looky: 12869.419921875, lookz: -742.4600219726562 };
  //
  // async.waterfall([
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInQuad', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutQuad', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInOutQuad', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInCubic', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutCubic', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInOutCubic', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInQuart', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInOutQuart', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInQuint', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutQuint', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInOutQuint', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInSine', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutSine', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInOutSine', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInExpo', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutExpo', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInOutExpo', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInCirc', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutCirc', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutBounce', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInBack', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeOutBack', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeInOutBack', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'elastic', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'swingFromTo', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'swingFrom', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'swingTo', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'bounce', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'bouncePast', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeFromTo', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeFrom', next);
  //   },
  //   function(next) {
  //     camera.setPos(-19716.70703125, 15282.9462890625, -849.1732788085938);
  //     camera.lookAt(-19365.123046875, 14815.9541015625, -839.6096801757812);
  //     camera.moveToWithTween(from, to, 'easeTo', next);
  //   }
  // ]);

  //
  // camera.moveToWithTween({
  //   x: 0,
  // },{
  //   x: 500,
  // });
  //camera.updateRotationVector();

  //player.advanceInDirection();
  //player.disableMovement();
  //console.log(memory.find("F3 0F11 4F 6C"));
  //camera.moveTo(-21560.38477, 20624.51367, -2648.775391);
  //player.moveTo(-709.7493896, 786.5465088, 87.42912292);
  //environment.enableTimeOfDay();
  //player.clickToTeleport();
  //setInterval(() => {
  //  console.log(player.getRoation());
  //});
  //player.advanceInDirection();
  //player.enableMovement();
  //player.disableMovement();
  //camera.disableSpectateMode();
  //camera.enableSpectateMode();
  //camera.moveTo(13191.09082, -7999.123535, -706.0720825);

// console.log('{"time":0.1,"value": ' + cameraPos.x + ',"_color":"#893c0f","tween":"quadEaseIn"}')
// console.log('{"time":0.1,"value": ' + cameraPos.y + ',"_color":"#893c0f","tween":"quadEaseIn"}')
// console.log('{"time":0.1,"value": ' + cameraPos.z + ',"_color":"#893c0f","tween":"quadEaseIn"}')
// console.log('{"time":0.1,"value": ' + curFwd.x + ',"_color":"#893c0f","tween":"quadEaseIn"}')
// console.log('{"time":0.1,"value": ' + curFwd.y + ',"_color":"#893c0f","tween":"quadEaseIn"}')
// console.log('{"time":0.1,"value": ' + curFwd.z + ',"_color":"#893c0f","tween":"quadEaseIn"}')
// console.log('-----' + counter);
// counter++;
//
//
//
//
      //
      // if (Keyboard.getState(robot.KEY_W)) {
      //   curFwd.x = curFwd.x + Math.cos(angle) * velocity;
      //   curFwd.y = curFwd.y + Math.sin(angle) * velocity;
      //   curFwd.z = curFwd.z;
      //   cameraPos.x = cameraPos.x + Math.cos(angle) * velocity;
      //   cameraPos.y = cameraPos.y + Math.sin(angle) * velocity;
      //   cameraPos.z = cameraPos.z;
      // }
      //
      // if (Keyboard.getState(robot.KEY_S)) {
      //   curFwd.x = curFwd.x - Math.cos(angle) * velocity;
      //   curFwd.y = curFwd.y - Math.sin(angle) * velocity;
      //   curFwd.z = curFwd.z;
      //   cameraPos.x = cameraPos.x - Math.cos(angle) * velocity;
      //   cameraPos.y = cameraPos.y - Math.sin(angle) * velocity;
      //   cameraPos.z = cameraPos.z;
      // }
      //
      //
      //      //
			      // if (Keyboard.getState(robot.KEY_A)) {
			      //   curFwd.y = curFwd.y - velocity;
			      //   cameraPos.y = cameraPos.y - velocity;
			      // }
			      //
			      // if (Keyboard.getState(robot.KEY_D)) {
			      //   curFwd.y = curFwd.y + velocity;
			      //   cameraPos.y = cameraPos.y + velocity;
			      // }
			      //
			      //      // theta = - ( ( mousex - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
									// phi   =   ( ( mousey - container.offset[ 1 ] ) - halfHeight ) / halfHeight;
						      //
						      // horizontalAngle += 0.05 * theta;
						      // verticalAngle   += 0.05 * phi;
						      //
						      // if (Keyboard.getState(robot.KEY_X)) {
						      //   curFwd.x = cameraPos.x + r * Math.cos(verticalAngle) * Math.sin(horizontalAngle),
						      //   curFwd.y = cameraPos.y + r * Math.sin(verticalAngle);
						      // }
									/**
								   * Gw2.exe+BAA800 - 55                    - push ebp
								Gw2.exe+BAA801 - 8B EC                 - mov ebp,esp
								Gw2.exe+BAA803 - 51                    - push ecx
								Gw2.exe+BAA804 - 56                    - push esi
								Gw2.exe+BAA805 - 8B F1                 - mov esi,ecx
								Gw2.exe+BAA807 - 83 BE 2C1A0000 00     - cmp dword ptr [esi+00001A2C],00
								Gw2.exe+BAA80E - 75 20                 - jne Gw2.exe+BAA830
								Gw2.exe+BAA810 - E8 FB127BFF           - call Gw2.exe+35BB10
								Gw2.exe+BAA815 - 8D 4D FC              - lea ecx,[ebp-04]
								Gw2.exe+BAA818 - 89 86 241A0000        - mov [esi+00001A24],eax
								Gw2.exe+BAA81E - C7 45 FC 00000000     - mov [ebp-04],00000000
								Gw2.exe+BAA825 - E8 B6207BFF           - call Gw2.exe+35C8E0
								Gw2.exe+BAA82A - 89 86 281A0000        - mov [esi+00001A28],eax
								Gw2.exe+BAA830 - 8B 4D 08              - mov ecx,[ebp+08]
								Gw2.exe+BAA833 - 85 C9                 - test ecx,ecx
								Gw2.exe+BAA835 - 74 08                 - je Gw2.exe+BAA83F
								Gw2.exe+BAA837 - 8B 86 241A0000        - mov eax,[esi+00001A24]
								Gw2.exe+BAA83D - 89 01                 - mov [ecx],eax
								Gw2.exe+BAA83F - 8B 4D 0C              - mov ecx,[ebp+0C]
								Gw2.exe+BAA842 - 85 C9                 - test ecx,ecx
								Gw2.exe+BAA844 - 74 08                 - je Gw2.exe+BAA84E
								Gw2.exe+BAA846 - 8B 86 281A0000        - mov eax,[esi+00001A28]
								Gw2.exe+BAA84C - 89 01                 - mov [ecx],eax
								Gw2.exe+BAA84E - 8B 8E 201A0000        - mov ecx,[esi+00001A20]
								Gw2.exe+BAA854 - FF 86 2C1A0000        - inc [esi+00001A2C]
								Gw2.exe+BAA85A - E8 F124FFFF           - call Gw2.exe+B9CD50
								Gw2.exe+BAA85F - 89 86 201A0000        - mov [esi+00001A20],eax
								Gw2.exe+BAA865 - 5E                    - pop esi
								Gw2.exe+BAA866 - 8B E5                 - mov esp,ebp
								Gw2.exe+BAA868 - 5D                    - pop ebp
								Gw2.exe+BAA869 - C2 0800               - ret 0008

								buscar fld dword ptr [ecx+000019CC]


								Bytecode relacionado con el environment

								Gw2.exe+B9F484 - E8 D7CE1400           - call Gw2.exe+CEC360
								Gw2.exe+B9F489 - 8D 8D 50FFFFFF        - lea ecx,[ebp-000000B0]
								Gw2.exe+B9F48F - E8 9CCE1400           - call Gw2.exe+CEC330
								Gw2.exe+B9F494 - 8B 03                 - mov eax,[ebx]
								Gw2.exe+B9F496 - 8B CB                 - mov ecx,ebx
								Gw2.exe+B9F498 - 6A 07                 - push 07
								Gw2.exe+B9F49A - FF 90 98000000        - call dword ptr [eax+00000098]
								Gw2.exe+B9F4A0 - 8B 13                 - mov edx,[ebx]
								Gw2.exe+B9F4A2 - 8B CB                 - mov ecx,ebx
								Gw2.exe+B9F4A4 - 89 85 70FFFFFF        - mov [ebp-00000090],eax
								Gw2.exe+B9F4AA - 6A 18                 - push 18
								Gw2.exe+B9F4AC - FF 92 98000000        - call dword ptr [edx+00000098]
								Gw2.exe+B9F4B2 - 8B 13                 - mov edx,[ebx]
								Gw2.exe+B9F4B4 - 8B CB                 - mov ecx,ebx
								Gw2.exe+B9F4B6 - 6A 1A                 - push 1A
								Gw2.exe+B9F4B8 - 89 85 64FFFFFF        - mov [ebp-0000009C],eax
								Gw2.exe+B9F4BE - FF 92 98000000        - call dword ptr [edx+00000098]
								Gw2.exe+B9F4C4 - 89 85 48FFFFFF        - mov [ebp-000000B8],eax
								Gw2.exe+B9F4CA - 8B 83 90000000        - mov eax,[ebx+00000090]
								Gw2.exe+B9F4D0 - D1 E8                 - shr eax,1
								Gw2.exe+B9F4D2 - F7 D0                 - not eax
								Gw2.exe+B9F4D4 - 83 E0 01              - and eax,01

								Para desactivar el terreno, simplemente mirar la primera función dentro de MapTrnUpdate y de ahí nop  Gw2.exe+BD4A01 - F3 0F10 4A 10         - movss xmm1,[edx+10]
								MapZoneAdvance tiene que ver con los elementos del entorno!! M2!

								Buscar esto! super interesante!!
								Gw2.exe+BD7C7F - F3 0F10 46 24         - movss xmm0,[esi+24]
								Gw2.exe+BD7C84 - F3 0F11 45 F4         - movss [ebp-0C],xmm0
								Gw2.exe+BD7C89 - F3 0F10 46 28         - movss xmm0,[esi+28]
								Gw2.exe+BD7C8E - F3 0F11 45 F8         - movss [ebp-08],xmm0
								Gw2.exe+BD7C93 - 8B 01                 - mov eax,[ecx]
								Gw2.exe+BD7C95 - FF 90 C4000000        - call dword ptr [eax+000000C4]
								Gw2.exe+BD7C9B - F3 0F10 2E            - movss xmm5,[esi]
								Gw2.exe+BD7C9F - F3 0F10 66 04         - movss xmm4,[esi+04]
								Gw2.exe+BD7CA4 - 0F28 DD               - movaps xmm3,xmm5
								Gw2.exe+BD7CA7 - F3 0F10 56 08         - movss xmm2,[esi+08]

								*/
