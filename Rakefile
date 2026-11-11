require "rubygems"
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
  'version' => "12.3.2",
  'themes' => File.join(SOURCE, "_includes", "themes"),
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
  'theme_package_version' => "0.1.0"
}

# Usage: rake post title="A Title" subtitle="A sub title" tags="AI, 团队管理"
desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  subtitle = ENV["subtitle"] || "This is a subtitle"
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  slug = "post" if slug.empty?  # 纯中文/非拉丁标题的兜底，避免文件名残缺
  tags = (ENV["tags"] || "").split(',').map(&:strip).reject(&:empty?)
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue Exception => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "subtitle: \"#{subtitle.gsub(/-/,' ')}\""
    post.puts "date: #{date}"
    post.puts "author: \"WuQingBao\""
    post.puts "header-img: \"img/post-bg-2015.jpg\""
    if tags.empty?
      post.puts "tags: []"
      post.puts "# 提醒：标签请从现有 64 个规范标签中选（见 tools/TAG_MIGRATION.md），并运行 python3 tools/tag_guard.py 验证"
    else
      post.puts "tags:"
      tags.each { |t| post.puts "  - #{t}" }
    end
    post.puts "---"
  end
  puts "提醒：标签白名单见 tools/TAG_MIGRATION.md；提交前跑 python3 tools/tag_guard.py 验证" unless tags.empty?
end # task :post

desc "Launch preview environment"
task :preview do
  system "jekyll --auto --server"
end # task :preview

#Load custom rake scripts
Dir['_rake/*.rake'].each { |r| load r }
