desc 'Install dependencies'
task :install do
	system 'bundle install'
	system 'npm install'
	system 'npm install -g browser-sync@2.23.5'
end

# Change basetheme.dev to your site path
desc 'Running Browsersync'
task :browsersync do
	system 'browser-sync start --proxy "web.thinkbase.localhost" --files "css/*.css, js/*.js, templates/**/*.twig" --no-inject-changes'
end

desc 'Watch sass'
task :sasswatch do
	system 'bundle exec sass -r sass-globbing --watch sass:css'
end

desc 'Run autoprefixer'
task :autoprefixwatch do
	system 'npx postcss css/style.css --use autoprefixer -o css/style.prefixed.css --watch'
end

desc 'Serve'
task :serve do
	threads = []
		%w{browsersync sasswatch browserify autoprefixwatch}.each do |task|
threads << Thread.new(task) do |devtask|
Rake::Task[devtask].invoke
end
end
threads.each {|thread| thread.join}
puts threads
end
