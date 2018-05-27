# JobMatcher
Job Matcher app

#Tech stack: .NET Core 2, xUnit, Moq, VueJS 2, SSR, Typescript, Webpack, SASS, Bulma

#Current bug / improvement needed:
+ Job Detail page throws 500 when refresh (need to debug the code in Node server)
+ Use NProgress for better UX
+ Highlight matched skills for each candidate
+ Job detail page needs to show more information of the current job
+ Lazy-loading candidate list (currently load all candidates in one hit)
+ Write Jest test
	
#HOW TO USE:
+ Backend: VS2017 WebAPI project, F5 to run it first
+ FrontEnd:
	- Change dev URL in globalconfig.ts
	- npm install
	- npm run dev

#FINAL NOTES:
+ This is a portion of my bigger project: https://github.com/Van-Vu/aussietowns which is hosted at https://funwithlocal.com/
+ In total this challenge takes me ~5hours to reach this state, hope it doesn't break the time-box rule :) 
