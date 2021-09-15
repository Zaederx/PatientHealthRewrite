package com.App.PatientHealth.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration//must have for this class to work
public class WebConfig implements WebMvcConfigurer {
 
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
		registry.addResourceHandler("/img/**").addResourceLocations("classpath:/static/img/");
		registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css/");
		registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");

		WebMvcConfigurer.super.addResourceHandlers(registry);
	}
//
	// @Override
	// public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
	// 	configurer.enable();
	// 	WebMvcConfigurer.super.configureDefaultServletHandling(configurer);
	// }
	
	
	
}
