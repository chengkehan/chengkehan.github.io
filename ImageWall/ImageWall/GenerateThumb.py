from PIL import Image
import os
import os.path

srcDir = '/Users/jimCheng/projects/blog_github/blog/ImageWall/ImageWall/images/full/'
destDir = '/Users/jimCheng/projects/blog_github/blog/ImageWall/ImageWall/images/thumbs/'

def GenerateThumb(srcPath, destpath):
	infile = srcPath
	outfile = destpath
	im = Image.open(infile)
	(x,y) = im.size #read image size
	if x < y:
		x_s = 250 #define standard width
		y_s = y * x_s / x #calc height based on standard width
	else:
		y_s = 250
		x_s = x * y_s / y

	out = im.resize((x_s,y_s),Image.ANTIALIAS) #resize image with high-quality
	out.save(outfile)

	print 'Generate:' + destpath

def GenerateThumbsInDir(srcDir, destDir):
	for parent,dirnames,filenames in os.walk(srcDir):
		for filename in filenames:
			if filename.endswith('.jpg') and os.path.exists(destDir + filename) == False:
				GenerateThumb(srcDir + filename, destDir + filename)
				jpg2whitepng(destDir + filename, destDir + filename + ".png")

def jpg2whitepng(srcPath, destPath):
	jpg = Image.open(srcPath)
	png = Image.new("RGB", jpg.size, (255,255,255))
	png.save(destPath,optimize=True,quality=0)

# GenerateThumb('D:/wamp/www/chengkehan.github.io/ImageWall/images/full/3.jpg', 'D:/wamp/www/chengkehan.github.io/ImageWall/images/thumbs/111.jpg')

GenerateThumbsInDir(srcDir, destDir)

# jpg2whitepng('D:/wamp/www/MyImageWall/ImageWall/images/thumbs/3.jpg', 'D:/wamp/www/MyImageWall/ImageWall/images/thumbs/3.png')
