In unity editor, if you get the Shader object in script by Shader.Find("ShaderName") method instead of drag shader into a ui slot, then Unity will not compile the shader with the application. At runtime unity cannot find the shader. 

So you should include the shader script manually.

Edit -> Project Settings -> Graphics. Add the shader script in the Inspector panel.