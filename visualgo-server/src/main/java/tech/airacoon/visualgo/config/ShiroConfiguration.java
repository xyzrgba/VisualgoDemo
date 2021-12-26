package tech.airacoon.visualgo.config;

import org.apache.shiro.cache.MemoryConstrainedCacheManager;
import org.apache.shiro.mgt.SessionsSecurityManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.apache.shiro.mgt.SecurityManager;

import java.util.HashMap;
import java.util.Map;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 配置Shiro
 */
@Configuration
public class ShiroConfiguration {
    /**
     * 将自己的验证方式加入其中
     *
     * @return
     */
    @Bean("authRealm")
    public AuthRealm selfAuthRealm() {
        AuthRealm authRealm = new AuthRealm();
        authRealm.setCacheManager(new MemoryConstrainedCacheManager());
        return authRealm;
    }

    @Bean
    public SessionsSecurityManager securityManager(@Qualifier("authRealm") AuthRealm authRealm) {
        DefaultWebSecurityManager webSecurityManager = new DefaultWebSecurityManager();
        webSecurityManager.setRealm(authRealm);
        return webSecurityManager;
    }

    /**
     * Filter工厂，设置对应的过滤条件和跳转条件
     *
     * @param securityManager
     * @return
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
        ShiroFilterFactoryBean filterFactoryBean = new ShiroFilterFactoryBean();
        filterFactoryBean.setSecurityManager(securityManager);
        Map<String, String> authMap = new HashMap<>();
//        authMap.put("/auth/**", "authc");
        authMap.put("/student/**", "authc");
        authMap.put("/admin/**", "authc");
        authMap.put("/teacher", "authc");
        authMap.put("/file/**", "anon");
        authMap.put("/sources/**", "anon");
        authMap.put("/static/**", "anon");
        authMap.put("/center/**", "authc");
        authMap.put("/question/**", "authc");
        authMap.put("/logout", "logout");
        filterFactoryBean.setLoginUrl("/auth/index");
//        filterFactoryBean.setSuccessUrl("/auth/success");
        filterFactoryBean.setUnauthorizedUrl("/");
        filterFactoryBean.setFilterChainDefinitionMap(authMap);
        return filterFactoryBean;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
        advisor.setSecurityManager(securityManager);
        return advisor;
    }

    @Bean
    public DefaultAdvisorAutoProxyCreator advisorAutoProxyCreator(SecurityManager securityManager) {
        DefaultAdvisorAutoProxyCreator creator = new DefaultAdvisorAutoProxyCreator();
        creator.setProxyTargetClass(true);
        return creator;
    }

    //    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }
}
