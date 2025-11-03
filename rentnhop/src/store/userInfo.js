export const userInfo = (set)=>({
   user:{
    username:null,
    userEmail:null
   },
   setUser : (name,email)=>set((state) => {
      return {
      user: { username: name, userEmail: email },
    }}),
   removeUser : ()=> set(() => ({
      user: { username: null, userEmail: null },
    })),
})