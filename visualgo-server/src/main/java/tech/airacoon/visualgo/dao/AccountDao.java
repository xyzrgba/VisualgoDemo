package tech.airacoon.visualgo.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.web.bind.annotation.PathVariable;
import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.AccountView;
import tech.airacoon.visualgo.pojo.Role;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 账户的DAO
 */
@Repository
public interface AccountDao {
    /**
     * @return
     */
    List<Role> getRoles();

    /**
     * @param email
     * @return
     */
    AccountView getAccountByEmail(@Param("email") String email);

    /**
     * @param id
     * @return
     */
    AccountView getAccountById(@Param("id") Integer id);

    /**
     * @param name
     * @return
     */
    AccountView getAccountByName(@Param("name") String name);

    /**
     * @param account
     * @return
     */
    Integer regAccount(@Param("account") Account account);

    /**
     * @param account
     * @return
     */
    Integer updateAccountInfoByEmail(@Param("account") Account account);

    /**
     * @param account
     * @return
     */
    Integer updatePassword(@Param("account") Account account);

    /**
     * @param account
     * @return
     */
    Integer updateAccountInfoById(@Param("account") Account account);

    /**
     * @param account
     * @return
     */
    List<AccountView> getAllAccounts(@Param("account") Account account);
}
