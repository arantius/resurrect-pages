#!/usr/bin/perl

=pod
usage:
* cd into old locale folder
* execute `for I in *; do ./zzz_genlocale.pl $I; done;rm -r _locales/zzz_genlocale.pl`
=cut

use warnings;
use strict;

chomp(my $extension_desc = `cat $ARGV[0]/overlay.properties|cut -d= -f2`);

chomp(my $resurrect_this_page = `grep resurrect.thispage $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);$resurrect_this_page=~s/\.\.\.//;
chomp(my $resurrect_this_link = `grep resurrect.thislink $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);$resurrect_this_link=~s/\.\.\.//;
chomp(my $google = `grep resurrect.google $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);
chomp(my $textonly = `grep resurrect.textonly $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);
chomp(my $archive = `grep "resurrect.archive " $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);
chomp(my $archiveis = `grep resurrect.archiveis $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);
chomp(my $webcit = `grep resurrect.webcitation $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);
chomp(my $curtab = `grep resurrect.inCurrTab $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);
chomp(my $newtab = `grep resurrect.inNewTab $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);
chomp(my $newwin = `grep resurrect.inNewWin $ARGV[0]/overlay.dtd |sed -e 's/^[^"]*"//' -e 's/">\\s*\$//'`);

my $locale = $ARGV[0];
$locale =~ s/-/_/g;
`mkdir -p _locales/$locale`;

open (my $file, '>', "_locales/$locale/messages.json");

print $file <<"EOF";
{
  "extensionName":         { "message": "Resurrect Pages" },
  "extensionDescription":  { "message": "$extension_desc" },
  "ResurrectPage":         { "message": "$resurrect_this_page" },
  "ResurrectLink":         { "message": "$resurrect_this_link" },
  "ResurrectGoogle":       { "message": "$google" },
  "ResurrectGoogleText":   { "message": "$google $textonly" },
  "ResurrectArchive":      { "message": "$archive" },
  "ResurrectArchiveIs":    { "message": "$archiveis" },
  "ResurrectWebcitation":  { "message": "$webcit" },
  "ResurrectInCurrentTab": { "message": "$curtab" },
  "ResurrectInNewTab":     { "message": "$newtab (foreground)" },
  "ResurrectInNewBGTab":   { "message": "$newtab (background)" },
  "ResurrectInNewWindow":  { "message": "$newwin" }
} 
EOF

close $file;
