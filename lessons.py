import os
import sys
from json import dumps

json_lessons = {}

lessons_dir = os.path.join( "docs", "lessons" )

for root, subdirs, files in os.walk( lessons_dir ):
	up, curr = os.path.split( root )

	# Ignore anything in the root of lesson folders
	if up == lessons_dir or up == "docs":
		continue

	lesson_name = os.path.split( up )[ 1 ]
	if lesson_name in json_lessons:
		lesson = json_lessons[ lesson_name ]
	else:
		json_lessons[ lesson_name ] = {}
		lesson = json_lessons[ lesson_name ]
		lesson[ "files" ] = {}

	for file_name in files:
		file = {}
		file_path = os.path.join( root, file_name )
		file[ "src" ] = curr + "/" + file_name
		with open( file_path, "r" ) as f:
			content = f.readlines()
			if len( content ) > 0:
				first = content[ 0 ]
				first = first.replace( "/*", "" ).replace( "*/", "" ).strip()
				first = first.split( ":" )
				priority = int( first[ 0 ] )
				first = first[ 1 : ]
				if "EXT" in first:
					file[ "ext" ] = first
				else:
					file[ "ext" ] = None
				file[ "user" ] = "USER" in first
				if file[ "user" ]:
					file[ "default" ] = "DEFAULT" in first
				lesson[ "files" ][ priority ] = file

for lesson_name in json_lessons:
	lesson_dir = os.path.join( lessons_dir, lesson_name )
	lessons_file = os.path.join( lesson_dir, "lesson.json" )
	desc_file = os.path.join( lesson_dir, "desc.txt" )
	with open( desc_file, "r+" ) as f:
		content = f.readlines()
		print( content )
		json_lessons[ lesson_name ][ "title" ] = " ".join( lesson_name.split( "-" ) )
		json_lessons[ lesson_name ][ "desc" ] =  ""
		if len( content ) >= 2:
			json_lessons[ lesson_name ][ "title" ] = content[ 0 ].strip()
			json_lessons[ lesson_name ][ "desc" ] = content[ 1 ].strip()
		else:
			f.write( json_lessons[ lesson_name ][ "title" ] + "\nWrite something here!" )

	files = []
	for i in range( len( json_lessons[ lesson_name ][ "files" ] ) ):
		files.append( json_lessons[ lesson_name ][ "files" ][ i ] )
	json_lessons[ lesson_name ][ "files" ] = files
	with open( lessons_file, "w" ) as f:
		f.write( dumps( json_lessons[ lesson_name ] ) )

			#with open(file_path, 'rb') as f:
			#	f_content = f.read()
			#	list_file.write(('The file %s contains:\n' % filename).encode('utf-8'))
			#	list_file.write(f_content)
			#	list_file.write(b'\n')