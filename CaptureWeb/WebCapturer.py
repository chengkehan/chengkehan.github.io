import urllib
import os
import sys
import re
import hashlib
import shutil

webPage = "https://chengkehan.github.io/"
rootDir = sys.path[0] + "/web"
totalDepths = 3

def trace(msg) : 
	print msg
	# print ""
	pass

def combineURL(baseURL, url) :
	if url.find("http") != -1 : 
		return url

	newBaseURL = baseURL
	if baseURL.find(".html") != -1 : 
		newBaseURL = baseURL[0 : baseURL.rfind("/", 0, baseURL.find(".html"))]

	return newBaseURL + "/" + url

def createDir(dirPath) : 
	if os.path.exists(dirPath) == False : 
		os.mkdir(dirPath)

def deleteDir(dirPath) : 
	if os.path.exists(dirPath) : 
		shutil.rmtree(dirPath)

def md5(content) : 
	m = hashlib.md5()
	m.update(content)
	return m.hexdigest()

def getHTML(url) :
	page = urllib.urlopen(url)
	html = page.read()
	page.close()
	return html

def writeFile(content, name) : 
	file = open(rootDir + "/" + name, "w")
	file.write(content)
	file.close()

def processLinks(html, webPage, depth) : 
	reg = "\<link.+?\>"
	linkRe = re.compile(reg)
	linkList = re.findall(linkRe, html)

	for linkItem in linkList : 
		if linkItem.find(".html") != -1 : 
			continue
		if linkItem.find("http") != -1 : 
			continue
		reg = "href=\".+?\""
		hrefRe = re.compile(reg)
		hrefList = re.findall(hrefRe, linkItem)
		if len(hrefList) == 0 : 
			continue
		hrefItem = hrefList[0]
		hrefContent = hrefItem[hrefItem.find("\"") + 1 : hrefItem.rfind("\"")]
		trace("processLink:" + combineURL(webPage, hrefContent))
		hrefRealContent = getHTML(combineURL(webPage, hrefContent))
		writeFile(hrefRealContent, md5(hrefContent))
		newHrefItem = hrefItem.replace(hrefContent, md5(hrefContent))
		newLinkItem = linkItem.replace(hrefItem, newHrefItem)
		html = html.replace(linkItem, newLinkItem)

	return html

def processAhrefs(html, webPage, depth) : 
	reg = "\<a href=\".+?\""
	ahrefRe = re.compile(reg)
	ahrefList = re.findall(ahrefRe, html)

	for ahrefItem in ahrefList : 
		ahrefContent = ahrefItem[ahrefItem.find("\"") + 1 : ahrefItem.rfind("\"")]
		if ahrefContent.find(".html") != -1 : 
			processWebPage(combineURL(webPage, ahrefContent), md5(ahrefContent) + ".html", depth + 1)
			newahrefItem = ahrefItem.replace(ahrefContent, md5(ahrefContent) + ".html")
			html = html.replace(ahrefItem, newahrefItem)

	return html

def processImgs(html, webPage, depth) : 
	reg = "\<img.*?\>"
	imgRe = re.compile(reg)
	imgList = re.findall(imgRe, html)

	for imgItem in imgList : 
		reg = "src=\".+?\""
		srcRe = re.compile(reg)
		srcList = re.findall(srcRe, imgItem)
		if len(srcList) == 0 : 
			continue
		srcItem = srcList[0]
		srcContent = srcItem[srcItem.find("\"") + 1 : srcItem.rfind("\"")]
		trace("processImg:" + combineURL(webPage, srcContent))
		urllib.urlretrieve(combineURL(webPage, srcContent), rootDir + "/" + md5(srcContent))
		newSrcItem = srcItem.replace(srcContent, md5(srcContent))
		newImgItem = imgItem.replace(srcItem, newSrcItem)
		html = html.replace(imgItem, newImgItem)

	return html

def processHTML(html, webPage, depth) : 
	html = processLinks(html, webPage, depth)
	html = processAhrefs(html, webPage, depth)
	html = processImgs(html, webPage, depth)
	return html

def processWebPage(webPage, name, depth) :
	if depth > totalDepths : 
		return

	# if webPage.find(".html") == -1 : 
	# 	trace("processWebPage: SKIP " + webPage)
	# else : 
	trace("processWebPage:" + webPage)
	html = getHTML(webPage)
	html = processHTML(html, webPage, depth)

	newName = md5(webPage) + ".html"
	if name != None : 
		newName = name

	writeFile(html, newName)

deleteDir(rootDir)
createDir(rootDir)
processWebPage(webPage, "index.html", 1)
