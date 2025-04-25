FROM ruby:3.4.3

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 4500

CMD ["ruby", "app.rb", "-p", "4500"]



# FROM ruby:3.1.2

# WORKDIR /app

# # Copy Gemfile and Gemfile.lock first to leverage Docker cache
# COPY Gemfile Gemfile.lock ./
# RUN bundle install

# # Copy the rest of the application code
# COPY . .

# EXPOSE 4500

# CMD ["ruby", "app.rb", "-p", "4500"]
