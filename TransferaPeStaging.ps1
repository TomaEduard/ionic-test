
$file = (Get-Content C:\Taskbar\Aplicatii\~Tutoriale\ionic-version-app\android\app\build.gradle)

#$file
# "versionCode 551 versionName 1.0 testInstrumentationRunner" | Select-String -Pattern '^versionCode (.*)versionName'  | % {"Versiunea este: $($_.matches.groups[1])"}
# $file | Select-String -Pattern '^versionCode(.*)versionName' | % {"Versiunea este: $($_.matches.groups[1])"}

$input_path = ‘C:\Taskbar\Aplicatii\~Tutoriale\ionic-version-app\android\app\build.gradle’
$output_file = ‘C:\test’
$regex = '^versionCode(.*)versionName'
select-string -Path $input_path -Pattern $regex | % {"Versiunea este: $($_.matches.groups[1])"}