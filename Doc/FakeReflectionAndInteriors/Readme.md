# Fake Reflection And Interiors

## Introduction

This tool is used for simulating interiors and reflection with a Cubemap. We baked static object into a cubemap to simulate interiors and reflection. Compared to realtime interiors/reflection rendering, we will get a low overhead and high quality inteirors/reflection effect.

## Demos

[Fake Interior Demo Windows](https://chengkehan.github.io/Bin/FakeInterior/DemoWin.zip)

[Fake Interior Demo Mac](https://chengkehan.github.io/Bin/FakeInterior/DemoMac.zip)

<img src="./Imgs/1.jpg" width="200px"/>
<img src="./Imgs/2.jpg" width="200px"/>
<img src="./Imgs/3.jpg" width="200px"/>

In this demo scene, there is an empty house, we use this tool to simulate a fake interior. As you can see, It's almost real. You can't see any artificiality even if you're close enough. We also add distortion and frosted glass effect to windows.

[Fake Reflection Demo Windows](https://chengkehan.github.io/Bin/FakeReflection/DemoWin.zip)

[Fake Reflection Demo Mac](https://chengkehan.github.io/Bin/FakeReflection/DemoMac.zip)

<img src="./Imgs/4.jpg" width="200px"/>
<img src="./Imgs/5.jpg" width="200px"/>

In thie demo scene, we use this tool to simulate reflection of water.

## Parameters

<img src="./Imgs/6.png" width="300px"/>

**Center, Size, Size Scale**

`These parameters are used to control size of yellow box. Different sizes of yellow boxes will give different results.`

<img src="./Imgs/7.png" width="300px"/>

**Two Side**

`Cull Back or Cull Off`

**Forward Asix**

`The forward axis in object's coordinate space`

**Is Local**

`Normal Cubemap mode or Local Cubemap mode`

<img src="./Imgs/8.png" width="300px"/>
<img src="./Imgs/9.png" width="300px"/>

**Inner Simulateion**

`Reflection mode or Interior mode`

<img src="./Imgs/10.png" width="300px"/>
<img src="./Imgs/11.png" width="300px"/>

**Roughness**

`Roughness of surface`

<img src="./Imgs/12.png" width="300px"/>

**Is Object Space**

`Calculate fake reflection and interior in world space or object space`

<img src="./Imgs/13.gif" width="300px"/>
<img src="./Imgs/14.gif" width="300px"/>

**Bump Texture, Bump Intensity, Bump Scale, Bump ...**

`Add waves to surface`

<img src="./Imgs/15.png" width="300px"/>
<img src="./Imgs/16.png" width="300px"/>

<img src="./Imgs/17.png" width="300px"/>
<img src="./Imgs/18.png" width="300px"/>
