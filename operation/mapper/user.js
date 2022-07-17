module.exports = (model, body) => {
  const { name, email, phone, image, password } = body;
  if (name) model.name = name;
  if (email) model.email = email;
  if (phone) model.phone = phone;
  if (image) model.image = image;
  if (password) model.password = password;
};
